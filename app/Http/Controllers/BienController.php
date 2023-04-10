<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use App\Http\Requests\StoreBienRequest;
use App\Http\Requests\UpdateBienRequest;

class BienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreBienRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBienRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bien  $bien
     * @return \Illuminate\Http\Response
     */
    public function show(Bien $bien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bien  $bien
     * @return \Illuminate\Http\Response
     */
    public function edit(Bien $bien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBienRequest  $request
     * @param  \App\Models\Bien  $bien
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBienRequest $request, Bien $bien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bien  $bien
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bien $bien)
    {
        //
    }
}
