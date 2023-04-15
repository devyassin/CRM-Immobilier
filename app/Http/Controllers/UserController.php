<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class UserController extends Controller
{
   
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    // public function store(Request $req)
    // {
    //     try {
    //         //create validation
    //             $validate = Validator::make($req->all(), [
    //                 'email' => 'required|email|unique:users,email|max:255',
    //                 'password' => 'required|string|max:255',
    //                 'name' => 'required|string|max:255',
    //                 'age' => 'required|integer',
    //                 'role' => 'required|in:admin,user',
    //                 'address' => 'required|string|max:255',
    //                 'type' => 'required|string|max:255',
    //                 'tel' => 'required|string|max:255',
    //                 'status' => 'required|string|max:255',
    //                 'payment_status' => 'required|string|max:255',
    //                 'payment_date' => 'required|date',
                    
    //             ]);
    //             if ($validate->fails()) {
    //                 return response()->json([
    //                     'status' => false,
    //                     'message' => $validate->errors()
    //                 ]);
    //             } else {
    //         $data= User::create([
    //             'email' => $req->email,
    //             'name' => $req->name,
    //             'age' => $req->age,
    //             'role' => $req->role,
    //             'address' => $req->address,
    //             'type' => $req->type,
    //             'tel' => $req->tel,
    //             'status' => $req->status,
    //             'id_role' => $req->id_role,
    //             'payment_status' => $req->payment_status,
    //             'payment_date' => $req->payment_date,
    //             'password' => bcrypt($req->password)]);
    //         if (!$data) {
    //         return response()->json([
    //             'status'=>400,
    //             'error'=>'something went wrong',
    //         ]);
    //         }
    //         else {
    //               return response()->json([
    //                 'status'=>200,
    //                 'message'=>'User SUCCESFULLY SAVED',
    //                 'User'=>$data
    
    //               ]);
    //              }}
    //              } catch (\Throwable $e) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => $e->getMessage()
    //             ]);
    //         }
        
    // }

       public function show(User $user)
    {
        //
    }

    public function edit(User $user)
    {
        //
    }


    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
}