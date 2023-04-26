<?php

        namespace App\Http\Controllers;
        
        use App\Models\Facture_biens;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;
        
        class FacturebiensController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {

                //$client = $request->input('nom');

                $facture_biens = DB::table('facture_biens')
                /*->join('clients', 'facture_biens.client_id', '=', 'clients.id')
                ->select('facture_biens.*', 'clients.*')
                ->where('nom', 'like', "%$client%")*/
                ->get();
                $count = $facture_biens->count();
                
                
                return response()->json(['count' => $count,'facture_biens' => $facture_biens], Response::HTTP_OK);
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
                    'facture_id' => 'required',
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
                
        
                    $facture_biens = Facture_biens::create($validatedData);
                  
            
                return response()->json([
                    'data' => $facture_biens,
                ], 201);
            }
        
            
            public function show(Facture_biens $facture_biens)
            {      
                return response()->json($facture_biens);
            }
        
           
            public function update(Request $request, Facture_biens $facture_biens)
            {
                try {
                    $validatedData = $request->validate([
                        'facture_id' => 'required',
                        'bien_id' => 'required',
                        ]);   
            
                    $facture_biens->update($validatedData);
            
                    return response()->json([
                        'data' => $facture_biens,
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
        
            public function destroy(Facture_biens $facture_biens)
            {
                $facture_biens->delete();
        
                return response()->json(['facture_biens' => $facture_biens,'message' => 'facture_biens  deleted successfully']);
            }
        }