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
        'espace',
        'description',
        'image',
        'location',
        'price',
        'status',
        'comission',
        'client_id',
        'user_id',
        'devis_id',
        'facture_id',
    ];
}
