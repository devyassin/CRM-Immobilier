<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Bien;
use App\Models\Client;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class TransactionController extends Controller
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
            $transactions = Transaction::where('user_id', $user->id)->get();
            $clientName = $request->input('client_name');
            $minPrice = $request->input('min_price');
            $maxPrice = $request->input('max_price');

            foreach ($transactions as $transaction) {
                $bien = Bien::where('id', $transaction->bien_id)->first();

                // If the bien is not found, set it to null
                if (!$bien) {
                    $bien = null;
                } else {
                    $client = Client::where('id', $bien->client_id)->where('nom', 'like', "%$name%")->first();

                    // If the client is not found, set it to null
                    if (!$client) {
                        $count=0;
                        return response()->json(['count'=> $count],201);
                    }
                }

                
                // Include bien and client information within the transaction
                $transaction->bien = $bien;
                $transaction->client = $client;
            }
           
            if ($minPrice) {
                $transactions = $transactions->where('prix', '>=', $minPrice);
            }
        
            if ($maxPrice) {
                $transactions = $transactions->where('prix', '<=', $maxPrice);
            }

            if ($clientName) {
                $filteredTransactions = [];
    
                foreach ($transactions as $transaction) {
                    // Check if the transaction has a client associated with it
                    if ($transaction->client) {
                        $clientNameMatches = str_contains(strtolower($transaction->client->nom), strtolower($clientName));
                        
                        // If the client name matches, include the transaction in the filtered results
                        if ($clientNameMatches) {
                            $filteredTransactions[] = $transaction;
                        }
                    }
                }
                
                $transactions = collect($filteredTransactions);
            }
            $count = $transactions->count();
            $transactions = $transactions->values()->toArray();
            return response()->json(['count' => $count,'transactions' => $transactions], Response::HTTP_OK);
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
     * @param  \App\Http\Requests\StoreTransactionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try{
        // Validate the request data
        $validatedData = $request->validate([
            'prix' => 'required|string',
            'mode_payement' => 'required|string',
            'comission' => 'required|string',
            'type' => ['required', Rule::in(['gain', 'lost'])],
            'date_transaction' => 'required|date',
            'bien_id' => 'required|exists:biens,id',
            'user_id' => 'required|exists:users,id',
        ]);
       }catch (ValidationException $exception) {
        $errors = $exception->validator->errors()->getMessages();
        $errorMessages = [];
        foreach ($errors as $field => $messages) {
            foreach ($messages as $message) {
                $errorMessages[] = "{$message}";
            }
        }
        return response()->json(['errors' => $errorMessages], 400);
       }
        

            // Create a new transaction
            $transaction = new Transaction();
            $transaction->prix = $validatedData['prix'];
            $transaction->mode_payement = $validatedData['mode_payement'];
            $transaction->comission = $validatedData['comission'];
            $transaction->type = $validatedData['type'];
            $transaction->date_transaction = $validatedData['date_transaction'];
            $transaction->bien_id = $validatedData['bien_id'];
            $transaction->user_id = $validatedData['user_id'];
            $transaction->save();

            $user = auth()->user();
            // Find the client based on the provided client email
            $bien = Bien::where('id', $validatedData['bien_id'])->where('user_id', $user->id)->first();

            // If the client is not found, return an error response
            if (!$bien) {
                return response()->json(['errors' => "Bien n'excit pas"], 404);
            }else{
                $client = Client::where('id', $bien->client_id)->first();

                // If the client is not found, return an error response
                if (!$client) {
                    return response()->json(['errors' => "Client n'excit pas"], 404);
                }
            }

            

         
            // Include bien information within the transaction response
            $transaction->bien = $bien;
            $transaction->client = $client;
            
            return response()->json([
                'data' => $transaction,
            ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transactions)
    {
        $bien = Bien::where('id', $transactions->bien_id)->first();

        // If the bien is not found, set it to null
        if (!$bien) {
            $bien = null;
        } else {
            $client = Client::where('id', $bien->client_id)->first();
    
            // If the client is not found, set it to null
            if (!$client) {
                $client = null;
            }
        }
    
        // Include bien and client information within the transaction
        $transactions->bien = $bien;
        $transactions->client = $client;
    
        return response()->json([
            'data' => $transactions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTransactionRequest  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transactions)
    {
         // Validate the request data
        $validatedData = $request->validate([
            'prix' => 'string',
            'mode_payement' => 'string',
            'comission' => 'string',
            'type' => ['nullable', Rule::in(['gain', 'lost'])],
            'date_transaction' => 'date',
            'bien_id' => 'exists:biens,id',
            'user_id' => 'exists:users,id',
        ]);

        // Update the transaction with the validated data
        $transactions->update($validatedData);

        // Retrieve the updated transaction from the database
        $updatedTransaction = Transaction::find($transactions->id);

        // Retrieve the associated bien and client information
        $bien = Bien::where('id', $updatedTransaction->bien_id)->first();

        // If the bien is not found, set it to null
        if (!$bien) {
            $bien = null;
        } else {
            $client = Client::where('id', $bien->client_id)->first();

            // If the client is not found, set it to null
            if (!$client) {
                $client = null;
            }
        }

        // Include bien and client information within the updated transaction
        $updatedTransaction->bien = $bien;
        $updatedTransaction->client = $client;

        return response()->json([
            'data' => $updatedTransaction,
            'message' => 'Transaction updated successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transactions)
    {
        $bien = Bien::where('id', $transactions->bien_id)->first();

        // If the bien is not found, set it to null
        if (!$bien) {
            $bien = null;
        } else {
            $client = Client::where('id', $bien->client_id)->first();
    
            // If the client is not found, set it to null
            if (!$client) {
                $client = null;
            }
        }
    
        // Include bien and client information within the transaction
        $transactions->bien = $bien;
        $transactions->client = $client;
        $transactions->delete();
        return response()->json([
            'data' => $transactions,
            'message' => 'Transaction deleted successfully.',
        ]);
    }
}