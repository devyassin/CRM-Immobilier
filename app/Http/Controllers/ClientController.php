<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $name = $request->input('name');

        $clients = Client::where('nom', 'like', "%$name%")->get();
        $count = $clients->count();

        return response()->json(['count' => $count,'clients' => $clients], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email|max:255',
            'last_contacted' => 'required|date_format:Y-m-d H:i:s',
            'user_id'=>'required'
            ]);    
            
        }catch (ValidationException $exception) {
            $errors = $exception->validator->errors()->getMessages();
            $errorMessages = [];
            foreach ($errors as $field => $messages) {
                foreach ($messages as $message) {
                    $errorMessages[] = "{$field}: {$message}";
                }
            }
            return response()->json(['errors' => $errorMessages], 400);
        }
        

            $client = Client::create($validatedData);
          
    
        return response()->json([
            'data' => $client,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }
    
        return response()->json($client);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}