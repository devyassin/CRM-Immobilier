<?php

namespace App\Http\Controllers;

use App\Models\BonDeVisite;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class BonDeVisiteController extends Controller
{
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index(Request $request)
            {
                $user = $request->user();
                $date = $request->input('date de visite');
        
                $Bondevisite = $user->Bondevisites()->where('date_visite', 'like', "%$date%")->get();
                $count = $Bondevisite->count();    
                
                return response()->json(['count' => $count,'resultats' => $Bondevisite], Response::HTTP_OK);
               
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
                    'description' => 'required|string',
                    'date_visite' => 'required|date_format:Y-m-d',
                    'user_id' => 'required|integer|exists:users,id',
                    'lead_id' => 'required|integer|exists:leads,id',
                    'bien_id' => 'required|integer|exists:biens,id',
                ]);

                // Create a new Bondevisite instance
                $Bondevisite = new Bondevisite();
                $Bondevisite->description = $validatedData['description'];
                $Bondevisite->date_visite = $validatedData['date_visite'];
                $Bondevisite->bien_id = $validatedData['bien_id'];
                $Bondevisite->lead_id = $validatedData['lead_id'];
                $Bondevisite->user_id = $validatedData['user_id'];
                $Bondevisite->save();


                // Return a response indicating success
                return response()->json(['message' => 'Bon de visite created successfully','resultats' => $Bondevisite], 201);
            }
        
            
            public function show(Bondevisite $Bondevisite)
            {      
                if (auth()->user()->id !== $Bondevisite->user_id) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                    return response()->json($Bondevisite);
            }
        
           
            public function update(Request $request,Bondevisite  $Bondevisite)
            {

                try {
                    $validatedData = $request->validate([
                        'description' => 'string',
                        'date_visite' => 'date_format:Y-m-d',
                        'user_id' => 'integer|exists:users,id',
                        'lead_id' => 'integer|exists:leads,id',
                        'bien_id' => 'integer|exists:biens,id',
                    ]);
            
                    $Bondevisite->update($validatedData);
                                     
                    return response()->json([
                        'data' => $Bondevisite,
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
        
            public function destroy(Bondevisite $Bondevisite)
            {
                $Bondevisite->delete();        
                return response()->json(['Bon de visite' => $Bondevisite,'message' => 'Bon de visite  deleted successfully']);
            }
        }