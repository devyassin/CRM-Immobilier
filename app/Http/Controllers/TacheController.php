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
        $title = $request->input('title');
        
        $taches = $user->taches->where('title', 'like', "%$title%")->get();
        $count = $taches->count();
        
        return response()->json(['count' => $count,'taches' => $taches], Response::HTTP_OK);
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
            'title' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'order' => 'required|string|max:255',
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

    public function show(Tache $tache)
    {
        if (auth()->user()->id !== $tache->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        return response()->json($tache);
    }


    public function update(Request $request, Tache $tache)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'order' => 'required|string|max:255',
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

    public function destroy(Tache $tache)
    {
        $tache->delete();

        return response()->json(['tache' => $tache,'message' => 'tache deleted successfully']);
    }
}