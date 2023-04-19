<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    protected $fillable = [
        'prix_total',
        'date',
        'mode_payment',
        'status',
        'description',
        'client_id',
        'user_id',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function bien(){
        return $this->hasMany(Bien::class);
    }
}
