<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class BienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $address = $request->input('address');
        
        $biens = $user->biens->where('address', 'like', "%$address%")->get();
        $count = $biens->count();
        
        return response()->json(['count' => $count,'biens' => $biens], Response::HTTP_OK);
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

    public function store(Request $request)
    {
        try{

            $validatedData = $request->validate([
            'address' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'espace' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'commission' => 'required|string|max:255',
            'client_id' => 'required',
            'devis_id' => 'required',
            'facture_id' => 'required',
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
        

            $bien = Bien::create($validatedData);
          
    
        return response()->json([
            'data' => $bien,
        ], 201);
    }

    
    public function show(Bien $bien)
    {
        if (auth()->user()->id !== $bien->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        return response()->json($bien);
    }

    
    

   
    public function update(Request $request, Bien $bien)
    {
        try {
            $validatedData = $request->validate([
                'address' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'espace' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'image' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'price' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'commission' => 'required|string|max:255',
                'client_id' => 'required',
                'devis_id' => 'required',
                'facture_id' => 'required',
                'user_id'=>'required'
                ]);
    
            $bien->update($validatedData);
    
            return response()->json([
                'data' => $bien,
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

    public function destroy(Bien $bien)
    {
        $bien->delete();

        return response()->json(['bien' => $bien,'message' => 'bien  deleted successfully']);
    }
}