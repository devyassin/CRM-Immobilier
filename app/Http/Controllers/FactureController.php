<?php

use App\Models\Client;

        namespace App\Http\Controllers;

use App\Models\Client;
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
                $count=$facture->count();
                return response()->json(['count' => $count,'factures' => $facture], 200);
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
                    'prix_total' => 'required|string',
                    'client_email' => 'required|email',
                    'date_creation' => 'required|date_format:Y-m-d',
                    'date_experation' => 'required|date_format:Y-m-d',
                    'status' => 'required|string|max:255',
                    'mode_payment' => 'required|string|max:255',
                    'user_id' => 'required|integer|exists:users,id',
                    'biens' => 'required|array',
                    'biens.*' => 'integer|exists:biens,id'
                ]);
            
                $user = auth()->user();
                // Find the client based on the provided client email
                $client = Client::where('email', $validatedData['client_email'])->where('user_id', $user->id)->first();
            
                // If the client is not found, return an error response
                if (!$client) {
                    return response()->json(['errors' => "Email n'appartient a aucune client"], 404);
                }
            
                // Create a new devis instance
                $facture = new Facture();
                $facture->prix_total = $validatedData['prix_total'];
                $facture->status = $validatedData['status'];
                $facture->mode_payment = $validatedData['mode_payment'];
                $facture->date_creation = $validatedData['date_creation'];
                $facture->date_experation = $validatedData['date_experation'];
            
                $facture->client_id = $client->id;
                $facture->user_id = $validatedData['user_id'];
                $facture->save();
            
                // Attach the biens to the facture
                $facture->biens()->attach($validatedData['biens']);
                $facture = Facture::with('client', 'biens')
                ->where('id', $facture->id)
                ->first();
                
                // Return a response indicating success
                return response()->json(['data' => $facture], 201);
            }
        
            
            public function show(Facture $facture)
            {   $facture = Facture::with('client', 'biens')
                          ->where('id',$facture->id)
                          ->first();

                if (!$facture) {
                    return response()->json(['message' => 'facture not found'], 404);
                }

                return response()->json($facture, 200);
            }
        
           
            public function update(Request $request, Facture $facture)
            {
                
                try {
                    $validatedData = $request->validate([
                        'prix_total' => 'required|string',
                        'date_creation' => 'required',
                        'date_experation' => 'required',
                        'status' => 'required|string|max:255',
                        'mode_payment' => 'required|string|max:255',
                        'user_id' => 'required|integer|exists:users,id',
                        'biens' => 'required|array',
                        'biens.*' => 'integer|exists:biens,id'
                    ]);
            
                    $facture->update($validatedData);
                   // Update the biens of the facture
                        if (isset($validatedData['biens'])) {
                            $facture->biens()->sync($validatedData['biens']);
                                }
                 // Return the updated facture with its Client and biens data
                    $updatedfacture = facture::with('client', 'biens')->find($facture->id);
                    
                    return response()->json([
                        'data' => $updatedfacture,
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
        
            public function destroy(Facture $facture)
            {
                $facture->factures_biens()->delete();
                $facture->delete();
        
                return response()->json(['Facture' => $facture,'message' => 'Facture  deleted successfully']);
            }
        }