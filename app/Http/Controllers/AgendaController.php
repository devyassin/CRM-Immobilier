<?php
        namespace App\Http\Controllers;


        
        use App\Models\Agenda;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Validation\ValidationException;
        
        class AgendaController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {
                $user = $request->user();
                $event = $request->input('evenement');
        
                $events = $user->agendas()->where('evenement', 'like', "%$event%")->get();
                $count = $events->count();

    
                
                return response()->json(['count' => $count,'resultats' => $events], Response::HTTP_OK);
               
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
                    'evenement' => 'required|string',
                    'description' => 'required|string',
                    'date' => 'required|date_format:Y-m-d',
                    'rdv_id' => 'required|integer',
                    'user_id' => 'required|integer|exists:users,id',
                ]);

                // Create a new Agenda instance
                $Agenda = new Agenda();
                $Agenda->evenement = $validatedData['evenement'];
                $Agenda->description = $validatedData['description'];
                $Agenda->date = $validatedData['date'];
                $Agenda->rdv_id = $validatedData['rdv_id'];
                $Agenda->user_id = $validatedData['user_id'];
                $Agenda->save();


                // Return a response indicating success
                return response()->json(['message' => 'Agenda created successfully','resultats' => $Agenda], 201);
            }
        
            
            public function show(Agenda $Agenda)
            {      
                if (auth()->user()->id !== $Agenda->user_id) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                    return response()->json($Agenda);
            }
        
           
            public function update(Request $request, Agenda $Agenda)
            {

                try {
                    $validatedData = $request->validate([
                        'evenement' => 'string',
                        'description' => 'string',
                        'date' => 'date_format:Y-m-d',
                        'rdv_id' => 'integer|exists:rdvs,id',
                        'user_id' => 'integer|exists:users,id',
                    ]);
            
                    $Agenda->update($request->all());
                    return response()->json([
                        'data' => $Agenda,
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
        
            public function destroy(Agenda $Agenda)
            {
                $Agenda->delete();        
                return response()->json(['Agenda' => $Agenda,'message' => 'Agenda  deleted successfully']);
            }
        }