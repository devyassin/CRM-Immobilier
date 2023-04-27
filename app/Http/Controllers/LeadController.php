<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use Illuminate\Validation\ValidationException;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $name = $request->input('name');
        
        $leads = $user->leads()->where('nom', 'like', "%$name%")->get();
        $count = $leads->count();
        
        return response()->json(['count' => $count,'leads' => $leads], Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreLeadRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|email|unique:leads,email|max:255',
            'status' => 'required|string|max:255',
            'lead_source' => 'required|in:référence,en ligne,médias sociaux,portes ouvertes',
            'user_id'=>'required|exists:users,id'
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
        

            $lead = Lead::create($validatedData);
          
    
        return response()->json([
            'data' => $lead,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\Response
     */
    public function show(Lead $lead)
    {
            // Check if the authenticated user owns the lead
        if (auth()->user()->id !== $lead->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        return response()->json($lead);
    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\Response
     */
    public function edit(Lead $lead)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateLeadRequest  $request
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lead $lead)
    {
        try {
            $validatedData = $request->validate([
                'nom' => 'string|max:255',
                'prenom' => 'string|max:255',
                'tel' => 'string|max:255',
                'address' => 'string|max:255',
                'email' => 'email|max:255|unique:leads,email,'.$lead->id,
                'status' => 'string|max:255',
                'lead_source' => 'in:référence,en ligne,médias sociaux,portes ouvertes',
                'user_id'=>'exists:users,id'
            ]);
    
            $lead->update($validatedData);
    
            return response()->json([
                'data' => $lead,
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
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return response()->json(['lead' => $lead,'message' => 'lead deleted successfully']);
    }
}