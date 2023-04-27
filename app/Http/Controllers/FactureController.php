<?php

        namespace App\Http\Controllers;
        
        use App\Models\Facture;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;

        
        class FactureController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {
                $userId = $request->user()->id;
    
                $facture = Facture::with('client', 'biens')
                            ->where('user_id', $userId)
                            ->whereHas('client', function ($query) use ($request) {
                                $query->where('nom', 'LIKE', '%'.$request->input('nom').'%');
                            })
                            ->get();
                
                return response()->json(['data' => $facture], 200);
            }
        
            /**
             * Show the form for creating a new resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function store(Request $request)
            {
                     try{       // Validate the request data
                            $validatedData = $request->validate([
                                'prix_total' => 'required|string|max:255',
                                'date' => 'required|date_format:Y-m-d',
                                'mode_payment' => 'required|in:cash,credit card,bank transfer,other',
                                'status' => 'required|in:paid,unpaid',
                                'description' => 'required|string|max:255',
                                'client_id' => 'required|exists:clients,id',
                                'user_id' => 'required|exists:users,id',
                                'biens' => 'required|array',
                                'biens.*' => 'integer|exists:biens,id'
                                ]);    
            
                            // Create a new devis instance
                            $facture = new Facture();
                            $facture->prix_total = $validatedData['prix_total'];
                            $facture->date = $validatedData['date'];
                            $facture->mode_payment = $validatedData['mode_payment'];
                            $facture->status = $validatedData['status'];
                            $facture->description = $validatedData['description'];
                            $facture->client_id = $validatedData['client_id'];
                            $facture->user_id = $validatedData['user_id'];
                            $facture->save();
            
                            // Attach the biens to the devis
                            $facture->biens()->attach($validatedData['biens']);
            
                            // Return a response indicating success
                            return response()->json(['message' => 'Fature created successfully'], 201);

                
        

                    
                }catch (ValidationException $exception) {
                    $errors = $exception->validator->errors()->getMessages();
                    $errorMessages = [];
                    foreach ($errors as $field => $messages) {
                        foreach ($messages as $message) {
                            $errorMessages[] = "{$message}";
                        }
                    }
                    return response()->json(['errors' => $errorMessages],400);
                }
                
        
                    $Facture = Facture::create($validatedData);
                  
            
                return response()->json([
                    'data' => $Facture,
                ], 201);
            }
        
            
            public function show(Facture $Facture)
            {       if (auth()->user()->id !== $Facture->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
                return response()->json($Facture);
            }
        
           
            public function update(Request $request, Facture $Facture)
            {
                try {
                    $validatedData = $request->validate([
                        'prix_total' => 'string|max:255',
                        'date' => 'date_format:Y-m-d',
                        'mode_payment' => 'in:cash,credit card,bank transfer,other',
                        'status' => 'in:paid,unpaid',
                        'description' => 'string|max:255',
                        'client_id' => 'exists:clients,id',
                        'user_id' => 'exists:users,id',
                        'biens' => 'array',
                        'biens.*' => 'integer|exists:biens,id'
                        ]);  
            
                    $Facture->update($validatedData);
                            // Update the biens of the Devis
                            if (isset($validatedData['biens'])) {
                                $Facture->biens()->sync($validatedData['biens']);
                                    }
                    // Return the updated Devis with its Client and biens data
                        $updatedFacture = Facture::with('client', 'biens')->find($Facture->id);
                        
                        return response()->json([
                            'data' => $updatedFacture,
                        ], 200);
                } catch (ValidationException $exception) {
                    $errors = $exception->validator->errors()->getMessages();
                    $errorMessages = [];
                    foreach ($errors as $field => $messages) {
                        foreach ($messages as $message) {
                            $errorMessages[] = "{$message}";
                        }
                    }
                    return response()->json(['errors' => $errorMessages], 400);
                }
            }
        
            public function destroy(Facture $Facture)
            {   
                $Facture->facture_biens()->delete();
                $Facture->delete();
        
                return response()->json(['Facture' => $Facture,'message' => 'Facture  deleted successfully']);
            }
        }