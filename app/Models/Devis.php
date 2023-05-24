<?php

namespace App\Models;

use App\Models\Bien;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Devis extends Model
{
    use HasFactory;
    protected $fillable = [
        'estimation',
        'description',
        'date_creation',
        'date_experation',
        'reference',
        'client_id',
        'user_id'
    ];
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function bien(){
        return $this->hasMany(Bien::class);
    }
    public function biens()
    {
        return $this->belongsToMany(Bien::class, 'devis_biens', 'devis_id', 'bien_id');
    }
    public function devis_biens()
{
    return $this->hasMany(devis_biens::class);
}
}