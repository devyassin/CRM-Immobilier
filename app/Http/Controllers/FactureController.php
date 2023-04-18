<?php

        namespace App\Http\Controllers;
        
        use App\Models\Facture;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
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
                $user = auth()->user();
                $client = $request->input('nom');
                $clients = $user->clients->where('nom', 'like', "%$client%")->get();
                $Facture = Facture::orderBy('id', 'desc')
                                ->where('client_id',$clients->id)
                                ->where('user_id',$user->id);

                $count = $Facture->count();
                
                return response()->json(['count' => $count,'Facture' => $Facture], Response::HTTP_OK);
            }
        
            /**
             * Show the form for creating a new resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function store(Request $request)
            {
                try{
        
                    $validatedData = $request->validate([
                    'prix_total' => 'required|string|max:255',
                    'date' => 'required|date_format:Y-m-d',
                    'mode_payment' => 'required|string|max:255',
                    'status' => 'required|string|max:255',
                    'description' => 'required|string|max:255',
                    'client_id' => 'required',
                    'user_id' => 'required',
                    ]);    
                    
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
                        'prix_total' => 'required|string|max:255',
                        'date' => 'required|date_format:Y-m-d',
                        'mode_payment' => 'required|string|max:255',
                        'status' => 'required|string|max:255',
                        'description' => 'required|string|max:255',
                        'client_id' => 'required',
                        'user_id' => 'required',
                        ]);  
            
                    $Facture->update($validatedData);
            
                    return response()->json([
                        'data' => $Facture,
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
                $Facture->delete();
        
                return response()->json(['Facture' => $Facture,'message' => 'Facture  deleted successfully']);
            }
        }