<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis_biens extends Model
{
    use HasFactory;
    protected $fillable = [
        'devis_id',
        'bien_id'
    ];
}
