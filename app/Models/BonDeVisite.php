<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonDeVisite extends Model
{
    use HasFactory;
    protected $fillable = [
        'date_visite',
        'description',
        'bien_id',
        'lead_id',
        'user_id',
    ];
}
