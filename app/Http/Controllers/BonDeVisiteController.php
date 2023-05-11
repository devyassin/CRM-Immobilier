<?php

namespace App\Http\Controllers;

use App\Models\BonDeVisite;
use App\Http\Requests\StoreBonDeVisiteRequest;
use App\Http\Requests\UpdateBonDeVisiteRequest;
use App\Models\Bien;
use App\Models\Lead;
use Illuminate\Http\Request;

class BonDeVisiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
    
                $bons = BonDeVisite::with('lead', 'bien')
                            ->where('user_id', $userId)
                            ->whereHas('lead', function ($query) use ($request) {
                                $query->where('nom', 'LIKE', '%'.$request->input('nom').'%');
                            })
                            ->get();
                $count=$bons->count();
                return response()->json(['count' => $count,'bons' => $bons], 200);
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
     * @param  \App\Http\Requests\StoreBonDeVisiteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            // Validate the request data
            $validatedData = $request->validate([
                'date_visite' => 'required|date_format:Y-m-d',
                'lead_email' => 'required|email',
                'raison' => 'required|string',
                'accompagnateur' => 'required|string',
                'NomBien' => 'required|string',
                'user_id' => 'required|integer|exists:users,id',
            ]);
            $user = auth()->user();
            // Find the lead based on the provided lead email
            $lead = Lead::where('email', $validatedData['lead_email'])->where('user_id', $user->id)->first();
        
            // If the lead is not found, return an error response
            if (!$lead) {
                return response()->json(['errors' => "Email n'appartient a aucune prospect !"], 404);
            }

            $bien=Bien::where('NomBien', $validatedData['NomBien'])->where('user_id', $user->id)->first();

            // If the bien is not found, return an error response
            if (!$bien) {
                return response()->json(['errors' => "Bien non trouvé !"], 404);
            }
        
            // Create a new devis instance
            $bon = new BonDeVisite();
            $bon->raison = $validatedData['raison'];
            $bon->accompagnateur = $validatedData['accompagnateur'];
            $bon->date_visite = $validatedData['date_visite'];
            $bon->lead_id = $lead->id;
            $bon->bien_id = $bien->id;
            $bon->user_id = $validatedData['user_id'];
            $bon->save();
        

           
            $bon->load('lead', 'bien');
        
            
            // Return a response indicating success
            return response()->json(['data' => $bon], 201);   
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BonDeVisite  $bonDeVisite
     * @return \Illuminate\Http\Response
     */
    public function show(BonDeVisite $bons)
    {
        $bons = BonDeVisite::with('lead', 'bien')
        ->where('id', $bons->id)
        ->first();

        if (!$bons) {
        return response()->json(['message' => 'Bon not found'], 404);
        }

        return response()->json($bons, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BonDeVisite  $bonDeVisite
     * @return \Illuminate\Http\Response
     */
    public function edit(BonDeVisite $bonDeVisite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBonDeVisiteRequest  $request
     * @param  \App\Models\BonDeVisite  $bonDeVisite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BonDeVisite $bons)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'date_visite' => 'required|date_format:Y-m-d',
            'lead_email' => 'required|email',
            'raison' => 'required|string',
            'accompagnateur' => 'required|string',
            'NomBien' => 'required|string',
            'user_id' => 'required|integer|exists:users,id',
        ]);
        
        $user = auth()->user();
        
        // Find the bon de visite by ID
        $bon = BonDeVisite::find($bons->id);
        
        // If the bon is not found, return an error response
        if (!$bon) {
            return response()->json(['errors' => "Bon de visite non trouvé !"], 404);
        }
        
        // Find the lead based on the provided lead email
        $lead = Lead::where('email', $validatedData['lead_email'])
            ->where('user_id', $user->id)
            ->first();
        
        // If the lead is not found, return an error response
        if (!$lead) {
            return response()->json(['errors' => "Email n'appartient à aucun prospect !"], 404);
        }
        
        $bien = Bien::where('NomBien', $validatedData['NomBien'])
            ->where('user_id', $user->id)
            ->first();
        
        // If the bien is not found, return an error response
        if (!$bien) {
            return response()->json(['errors' => "Bien non trouvé !"], 404);
        }
        
        // Update the bon de visite with the new data
        $bon->raison = $validatedData['raison'];
        $bon->accompagnateur = $validatedData['accompagnateur'];
        $bon->date_visite = $validatedData['date_visite'];
        $bon->lead_id = $lead->id;
        $bon->bien_id = $bien->id;
        $bon->user_id = $validatedData['user_id'];
        $bon->save();
        
        // Eager load the associated Lead and Bien models
        $bon->load('lead', 'bien');
        
        // Return a response indicating success
        return response()->json(['data' => $bon], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BonDeVisite  $bonDeVisite
     * @return \Illuminate\Http\Response
     */
    public function destroy(BonDeVisite $bons)
    {
        
                $bons->delete();
        
                return response()->json(['bon' => $bons,'message' => 'bon  deleted successfully']);
    }
}