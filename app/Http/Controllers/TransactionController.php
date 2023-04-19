<?php

        namespace App\Http\Controllers;
        
        use App\Models\Transaction;
        use Illuminate\Http\Request;
        use Illuminate\Http\Response;
        use Illuminate\Support\Facades\DB;
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

                $client = $request->input('nom');

                $Transaction = DB::table('Transactions')
                ->join('clients', 'Transactions.client_id', '=', 'clients.id')
                ->select('Transactions.*', 'clients.*')
                ->where('nom', 'like', "%$client%")
                ->get();
                $count = $Transaction->count();
                
                
                return response()->json(['count' => $count,'Transaction' => $Transaction], Response::HTTP_OK);
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
                    'prix' => 'required|string|max:255',
                    'mode_payment' => 'required|string|max:255',
                    'comition' => 'required|string|max:255',
                    'date_transaction' => 'required|date_format:Y-m-d',
                    'bien_id' => 'required',
                    'client_id' => 'required',
                    'user_id' => 'required',
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
                
        
                    $Transaction = Transaction::create($validatedData);
                  
            
                return response()->json([
                    'data' => $Transaction,
                ], 201);
            }
        
            
            public function show(Transaction $Transaction)
            {      
                return response()->json($Transaction);
            }
        
           
            public function update(Request $request, Transaction $Transaction)
            {
                try {
                    $validatedData = $request->validate([
                        'prix' => 'required|string|max:255',
                        'mode_payment' => 'required|string|max:255',
                        'comition' => 'required|string|max:255',
                        'date_transaction' => 'required|date_format:Y-m-d',
                        'bien_id' => 'required',
                        'client_id' => 'required',
                        'user_id' => 'required',
                        ]);  
            
                    $Transaction->update($validatedData);
            
                    return response()->json([
                        'data' => $Transaction,
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
        
            public function destroy(Transaction $Transaction)
            {
                $Transaction->delete();
        
                return response()->json(['Transaction' => $Transaction,'message' => 'Transaction  deleted successfully']);
            }
        }