<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'prix',
        'mode_payement',
        'type',
        'comission',
        'date_transaction',
        'bien_id',
        'user_id',
    ];

    public function biens(){
        return $this->belongsTo(Bien::class);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
}