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
        $nomBien=$request->input('nomBien');
        $status = $request->input('status');
        $exict=$request->input('exict');
        $sort = $request->input('sort');
        $order = $request->input('order');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        

        if ($exict) {
            $biens = $user->biens()->whereHas('client', function ($query) use ($clientName) {
                $query->where('nom', 'like', "%$clientName%");
            })->with('client')->where('address', 'like', "%$address%");
        }else{
            $biens = $user->biens()->whereHas('client', function ($query) use ($clientName) {
                $query->where('nom', 'like', "%$clientName%");
            })->with('client')->where('address', 'like', "%$address%")->where('exict', 'local');
        }
        
        
    
        if ($status) {
            $biens = $biens->where('status', $status);
        }
    
        if ($nomBien) {
            $biens = $biens->where('NomBien', $nomBien);
        }
        if ($minPrice) {
            $biens = $biens->where('price', '>=', $minPrice);
        }
    
        if ($maxPrice) {
            $biens = $biens->where('price', '<=', $maxPrice);
        }
    
        if ($sort && $order) {
            $biens = $biens->orderBy($sort, $order);
        }
    
        $biens = $biens->get();
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
        try {
            $validatedData = $request->validate([
                'NomBien' => 'required|string|max:255|unique:biens,NomBien,NULL,id,user_id,' . $request->user_id,
                'address' => 'string|max:255',
                'type' => 'string|max:255',
                'exict' => 'string|max:255',
                'description' => 'required|string|max:255',
                'location' => 'string|max:255',
                'price' => 'required|string|max:255',
                'status' => 'string|max:255',
                'comission' => 'required|string|max:255',
                'client_email' => 'string|email|max:255',
                'user_id' => 'required',
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
    
            $user = auth()->user();
            // Find the client based on the provided client email
            $client = Client::where('email', $validatedData['client_email'])->where('user_id', $user->id)->first();

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
                'NomBien' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'price' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'comission' => 'required|string|max:255',
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