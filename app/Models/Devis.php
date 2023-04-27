<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    use HasFactory;
    protected $fillable = [
        'estimation',
        'description',
        'reference',
        'client_id',
        'user_id',
    ];
    public function client(){
        return $this->belongsTo(Client::class);
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
