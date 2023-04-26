<?php

        namespace App\Http\Controllers;
        
        use App\Models\Devis_biens;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;
        
        class DevisbiensController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {

                //$client = $request->input('nom');

                $devis_biens = DB::table('devis_biens')
                /*->join('clients', 'devis_biens.client_id', '=', 'clients.id')
                ->select('devis_biens.*', 'clients.*')
                ->where('nom', 'like', "%$client%")*/
                ->get();
                $count = $devis_biens->count();
                
                
                return response()->json(['count' => $count,'devis_biens' => $devis_biens], Response::HTTP_OK);
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
                    'devis_id' => 'required',
                    'bien_id' => 'required',
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
                
        
                    $devis_biens = Devis_biens::create($validatedData);
                  
            
                return response()->json([
                    'data' => $devis_biens,
                ], 201);
            }
        
            
            public function show(Devis_biens $devis_biens)
            {      
                return response()->json($devis_biens);
            }
        
           
            public function update(Request $request, Devis_biens $devis_biens)
            {
                try {
                    $validatedData = $request->validate([
                        'facture_id' => 'required',
                        'bien_id' => 'required',
                        ]);   
            
                    $devis_biens->update($validatedData);
            
                    return response()->json([
                        'data' => $devis_biens,
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
        
            public function destroy(Devis_biens $devis_biens)
            {
                $devis_biens->delete();
        
                return response()->json(['devis_biens' => $devis_biens,'message' => 'devis_biens  deleted successfully']);
            }
        }