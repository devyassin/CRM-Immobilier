<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    protected $fillable = [
        'prix_total',
        'date_creation',
        'date_experation',
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

    public function biens()
    {
        return $this->belongsToMany(Bien::class, 'facture_biens', 'facture_id', 'bien_id');
    }
    public function factures_biens()
  {
    return $this->hasMany(facture_biens::class);
  }
}