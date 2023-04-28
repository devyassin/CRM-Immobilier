<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use App\Models\Client;
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
        $clientName = $request->input('client_name');
        $status = $request->input('status');
        $sort = $request->input('sort');
        $order = $request->input('order');
        
        $biens = $user->biens()->whereHas('client', function ($query) use ($clientName) {
            $query->where('nom', 'like', "%$clientName%");
        })->with('client')->where('address', 'like', "%$address%");
        
        if ($status) {
            $biens = $biens->where('status', $status);
        }
        
        if ($sort && $order) {
            $biens = $biens->orderBy($sort, $order);
        }
        
        $biens = $user->biens->where('address', 'like', "%$address%");
        $count = $biens->count();
        
        return response()->json(['count' => $count,'biens' => $biens], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
            'address' => 'required|string|max:255',
            'type' => 'required|string',
            'description' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'status' => 'required|string',
            'comission' => 'required|string|max:255',
            'client_email' => 'required|string',
            'user_id'=>'required|exists:users,id'
            ]);    
 

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
    
            // Find the client based on the provided client email
            $client = Client::where('email', $validatedData['client_email'])->first();

            // If the client is not found, return an error response
            if (!$client) {
                return response()->json(['errors' => "Email n'appartient a aucune client"], 404);
            }

            // Create the bien and associate it with the client
            $bien = new Bien($validatedData);
            $bien->client()->associate($client);
            $bien->save();

            return response()->json([
                'data' => $bien->load('client'),
            ], 201);
    }

    
    public function show(Bien $bien)
    {
    
        if (auth()->user()->id !== $bien->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        $bienWithClient = $bien->load('client');

        return response()->json($bienWithClient);
    }

    
    

   
    public function update(Request $request, Bien $bien)
    {
        try {
            $validatedData = $request->validate([
                'address' => 'string|max:255',
                'type' => 'string',
                'description' => 'string|max:255',
                'location' => 'string|max:255',
                'price' => 'string|max:255',
                'image' => 'string|max:255',
                'status' => 'string',
                'comission' => 'string|max:255',
                'client_id' => 'exists:clients,id',
                'user_id'=>'exists:users,id'
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