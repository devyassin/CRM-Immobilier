<?php
        namespace App\Http\Controllers;
      
        use App\Models\Rdv;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;
        
        class RdvController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {
                $user = $request->user();
                $nom = $request->input('nom');
        
                $rdv = $user->rdvs()->where('nom', 'like', "%$nom%")->get();
                $count = $rdv->count();    
                
                return response()->json(['count' => $count,'resultats' => $rdv], Response::HTTP_OK);
               
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
                    'nom' => 'required|string',
                    'tel' => 'required|string',
                    'status' => 'required|in:confirmed,canceled',
                    'description' => 'required|string',
                    'lieu' => 'required|string',
                    'date' => 'required|date_format:Y-m-d',
                    'user_id' => 'required|integer|exists:users,id',
                ]);

                // Create a new Rdv instance
                $Rdv = new Rdv();
                $Rdv->nom = $validatedData['nom'];
                $Rdv->description = $validatedData['description'];
                $Rdv->date = $validatedData['date'];
                $Rdv->lieu = $validatedData['lieu'];
                $Rdv->status = $validatedData['status'];
                $Rdv->tel = $validatedData['tel'];
                $Rdv->user_id = $validatedData['user_id'];
                $Rdv->save();


                // Return a response indicating success
                return response()->json(['message' => 'Rdv created successfully','resultats' => $Rdv], 201);
            }
        
            
            public function show(Rdv $Rdv)
            {      
                if (auth()->user()->id !== $Rdv->user_id) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                    return response()->json($Rdv);
            }
        
           
            public function update(Request $request,Rdv  $Rdv)
            {

                try {
                    $validatedData = $request->validate([
                        'nom' => 'string',
                        'tel' => 'string',
                        'status' => 'in:confirmed,canceled',
                        'description' => 'string',
                        'lieu' => 'string',
                        'date' => 'date_format:Y-m-d',
                        'user_id' => 'integer|exists:users,id',
                    ]);
            
                    $Rdv->update($validatedData);
                                     
                    return response()->json([
                        'data' => $Rdv,
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
        
            public function destroy(Rdv $Rdv)
            {
                $Rdv->delete();        
                return response()->json(['Rdv' => $Rdv,'message' => 'Rdv  deleted successfully']);
            }
        }