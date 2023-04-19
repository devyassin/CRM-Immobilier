<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\TacheController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DevisBiensController;
use App\Http\Controllers\FactureBiensController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Auth routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::group(['prefix' => 'v1','middleware'=>['auth:sanctum']],function () {
    // logout Route 
    Route::post('/logout', [AuthController::class, 'logout']);

    // Client Route
    Route::get('clients', [ClientController::class, 'index']);
    Route::get('clients/{client}', [ClientController::class, 'show']);
    Route::post('clients', [ClientController::class, 'store']);
    Route::put('clients/{client}', [ClientController::class, 'update']);
    Route::delete('clients/{client}', [ClientController::class, 'destroy']);

    //Lead Route 

    Route::get('leads', [LeadController::class, 'index']);
    Route::get('leads/{lead}', [LeadController::class, 'show']);
    Route::post('leads', [LeadController::class, 'store']);
    Route::put('leads/{lead}', [LeadController::class, 'update']);
    Route::delete('leads/{lead}', [LeadController::class, 'destroy']);

    //tache Route 

    Route::get('taches', [TacheController::class, 'index']);
    Route::get('taches/{tache}', [TacheController::class, 'show']);
    Route::post('taches', [TacheController::class, 'store']);
    Route::put('taches/{tache}', [TacheController::class, 'update']);
    Route::delete('taches/{tache}', [TacheController::class, 'destroy']);

    //bien Route 

    Route::get('biens', [BienController::class, 'index']);
    Route::get('biens/{bien}', [BienController::class, 'show']);
    Route::post('biens', [BienController::class, 'store']);
    Route::put('biens/{bien}', [BienController::class, 'update']);
    Route::delete('biens/{bien}', [BienController::class, 'destroy']);

    //facture Route 

    Route::get('factures', [FactureController::class, 'index']);
    Route::get('factures/{facture}', [FactureController::class, 'show']);
    Route::post('factures', [FactureController::class, 'store']);
    Route::put('factures/{facture}', [FactureController::class, 'update']);
    Route::delete('factures/{facture}', [FactureController::class, 'destroy']);

    //Devis Route 

    Route::get('devis', [DevisController::class, 'index']);
    Route::get('devis/{devis}', [DevisController::class, 'show']);
    Route::post('devis', [DevisController::class, 'store']);
    Route::put('devis/{devis}', [DevisController::class, 'update']);
    Route::delete('devis/{devis}', [DevisController::class, 'destroy']);

    //transaction Route 

    Route::get('transactions', [TransactionController::class, 'index']);
    Route::get('transactions/{transaction}', [TransactionController::class, 'show']);
    Route::post('transactions', [TransactionController::class, 'store']);
    Route::put('transactions/{transaction}', [TransactionController::class, 'update']);
    Route::delete('transactions/{transaction}', [TransactionController::class, 'destroy']);

    //facture_biens  Route 

    Route::get('facture_biens', [FacturebiensController::class, 'index']);
    Route::get('facture_biens/{facture_bien}', [FacturebiensController::class, 'show']);
    Route::post('facture_biens', [FacturebiensController::class, 'store']);
    Route::put('facture_biens/{facture_bien}', [FacturebiensController::class, 'update']);
    Route::delete('facture_biens/{facture_bien}', [FacturebiensController::class, 'destroy']);

    //Devis_Biens Route 

    Route::get('devis_biens', [DevisBiensController::class, 'index']);
    Route::get('devis_biens/{devis_bien}', [DevisBiensController::class, 'show']);
    Route::post('devis_biens', [DevisBiensController::class, 'store']);
    Route::put('devis_biens/{devis_bien}', [DevisBiensController::class, 'update']);
    Route::delete('devis_biens/{devis_bien}', [DevisBiensController::class, 'destroy']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});