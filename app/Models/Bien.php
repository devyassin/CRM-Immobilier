<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;
    protected $fillable = [
        'address',
        'type',
        'description',
        'location',
        'image',
        'price',
        'status',
        'comission',
        'client_id',
        'user_id',
        'devis_id',
        'facture_id',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }    public function devis(){
        return $this->belongsTo(Devis::class);
    }
    public function transaction(){
        return $this->hasMany(Transaction::class);
    }
    public function facture_biens(){
        return $this->hasMany(Facture_biens::class);
    }
    public function devis_biens(){
        return $this->hasMany(Devis_biens::class);}
}