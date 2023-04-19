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

                $client = $request->input('nom');

                $devis = DB::table('devis')
                ->join('clients', 'devis.client_id', '=', 'clients.id')
                ->select('devis.*', 'clients.*')
                ->where('nom', 'like', "%$client%")
                ->get();
                $count = $devis->count();
                
                
                return response()->json(['count' => $count,'Devis' => $devis], Response::HTTP_OK);
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
                    'estimation' => 'required|string|max:255',
                    'description' => 'required|string|max:255',
                    'reference' => 'required|string|max:255',
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
                
        
                    $Devis = Devis::create($validatedData);
                  
            
                return response()->json([
                    'data' => $Devis,
                ], 201);
            }
        
            
            public function show(Devis $Devis)
            {      
                return response()->json($Devis);
            }
        
           
            public function update(Request $request, Devis $Devis)
            {
                try {
                    $validatedData = $request->validate([
                        'estimation' => 'required|string|max:255',
                        'description' => 'required|string|max:255',
                        'reference' => 'required|string|max:255',
                        'client_id' => 'required',
                        'user_id' => 'required',
                        ]); 
            
                    $Devis->update($validatedData);
            
                    return response()->json([
                        'data' => $Devis,
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
                $Devis->delete();
        
                return response()->json(['Devis' => $Devis,'message' => 'Devis  deleted successfully']);
            }
        }