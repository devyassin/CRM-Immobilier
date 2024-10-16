<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;
    protected $fillable = [
        'NomBien',
        'address',
        'type',
        'exict',
        'description',
        'location',
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
    }
    public function transaction(){
        return $this->hasMany(Transaction::class);
    }
    public function devis(){
        return $this->belongsTo(Devis::class);
    }
    public function facture(){
        return $this->belongsTo(Facture::class);
    }

    public function bon(){
        return $this->hasMany(BonDeVisite::class);
    }
    
    public function transactions(){
        return $this->hasMany(Transaction::class);
    }
}