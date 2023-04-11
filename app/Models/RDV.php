<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RDV extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'tel',
        'status',
        'description',
        'date',
        'lieu',
        'user_id',
        'password',
    ];
}
