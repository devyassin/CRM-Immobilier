<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'type',
        'tel',
        'address',
        'email',
        'last_contacted',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function transaction(){
        return $this->hasMany(Transaction::class);
    }
    public function biens(){
        return $this->hasMany(Bien::class);
    }
    public function facture(){
        return $this->hasMany(Facture::class);
    }
    public function devis(){
        return $this->hasMany(Devis::class);
    }
}