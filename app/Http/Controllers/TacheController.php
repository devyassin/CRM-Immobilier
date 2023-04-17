<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\StoreTacheRequest;
use App\Http\Requests\UpdateTacheRequest;
use Illuminate\Validation\ValidationException;

class TacheController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $status = $request->input('status');
        
        $taches = $user->taches()->where('status', 'like', "%$status%")->get();
        $count = $taches->count();
        
        return response()->json(['count' => $count,'taches' => $taches], Response::HTTP_OK);
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
            'title' => 'required|string|max:40',
            'status' => 'required|string|in:À faire,En cours,Terminé',
            'description' => 'required|string|max:255',
            'deadline' => 'required|date|max:255',
            'user_id'=>'required'
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
        

            $tache = Tache::create($validatedData);
          
    
        return response()->json([
            'data' => $tache,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Tache $tache)
    {
            // Check if the authenticated user owns the client
        if (auth()->user()->id !== $tache->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        return response()->json($tache);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Tache $tache)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tache $tache)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'status' => 'required|string|in:À faire,En cours,Terminé',
                'description' => 'required|string|max:255',
                'deadline' => 'required|string|max:255',
                'user_id'=>'required'
                ]);
    
            $tache->update($validatedData);
    
            return response()->json([
                'data' => $tache,
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tache $tache)
    {
        $tache->delete();

        return response()->json(['tache' => $tache,'message' => 'Tache deleted successfully']);
    }
}