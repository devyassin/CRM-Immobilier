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
        'mode_payement',
        'status',
        'description',
        'client_id',
        'user_id',
    ];
}
