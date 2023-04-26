<?php
        namespace App\Http\Controllers;


        
        use App\Models\Devis;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;
        
        class DevisController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {
                $userId = $request->user()->id;
    
                $devis = Devis::with('client', 'biens')
                            ->where('user_id', $userId)
                            ->whereHas('client', function ($query) use ($request) {
                                $query->where('nom', 'LIKE', '%'.$request->input('nom').'%');
                            })
                            ->get();
                
                return response()->json(['data' => $devis], 200);
               
            }
        
            /**
             * Show the form for creating a new resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function store(Request $request)
            {
                            // Validate the request data
                $validatedData = $request->validate([
                    'estimation' => 'required|string',
                    'description' => 'required|string',
                    'reference' => 'required|string',
                    'client_id' => 'required|integer|exists:clients,id',
                    'user_id' => 'required|integer|exists:users,id',
                    'biens' => 'required|array',
                    'biens.*' => 'integer|exists:biens,id'
                ]);

                // Create a new devis instance
                $devis = new Devis();
                $devis->estimation = $validatedData['estimation'];
                $devis->description = $validatedData['description'];
                $devis->reference = $validatedData['reference'];
                $devis->client_id = $validatedData['client_id'];
                $devis->user_id = $validatedData['user_id'];
                $devis->save();

                // Attach the biens to the devis
                $devis->biens()->attach($validatedData['biens']);

                // Return a response indicating success
                return response()->json(['message' => 'Devis created successfully'], 201);
            }
        
            
            public function show(Devis $Devis)
            {      
                $devis = Devis::with('client', 'biens')->find($Devis);
    
                if (!$devis) {
                    return response()->json(['message' => 'Devis not found'], 404);
                }
                
                return response()->json(['data' => $devis], 200);
            }
        
           
            public function update(Request $request, Devis $Devis)
            {

                try {
                    $validatedData = $request->validate([
                        'estimation' => 'string',
                        'description' => 'string',
                        'reference' => 'string',
                        'client_id' => 'integer|exists:clients,id',
                        'user_id' => 'integer|exists:users,id',
                        'biens' => 'array',
                        'biens.*' => 'integer|exists:biens,id'
                    ]);
            
                    $Devis->update($validatedData);
                   // Update the biens of the Devis
                        if (isset($validatedData['biens'])) {
                            $Devis->biens()->sync($validatedData['biens']);
                                }
                 // Return the updated Devis with its Client and biens data
                    $updatedDevis = Devis::with('client', 'biens')->find($Devis->id);
                    
                    return response()->json([
                        'data' => $updatedDevis,
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
        
            public function destroy(Devis $Devis)
            {
            

                $Devis->devis_biens()->delete();
                $Devis->delete();
        
                return response()->json(['Devis' => $Devis,'message' => 'Devis  deleted successfully']);
            }
        }