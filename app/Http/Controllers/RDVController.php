<?php

namespace App\Http\Controllers;

use App\Models\RDV;
use App\Http\Requests\StoreRDVRequest;
use App\Http\Requests\UpdateRDVRequest;

class RDVController extends Controller
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
     * @param  \App\Http\Requests\StoreRDVRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRDVRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RDV  $rDV
     * @return \Illuminate\Http\Response
     */
    public function show(RDV $rDV)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RDV  $rDV
     * @return \Illuminate\Http\Response
     */
    public function edit(RDV $rDV)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRDVRequest  $request
     * @param  \App\Models\RDV  $rDV
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRDVRequest $request, RDV $rDV)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RDV  $rDV
     * @return \Illuminate\Http\Response
     */
    public function destroy(RDV $rDV)
    {
        //
    }
}
