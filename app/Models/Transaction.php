<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'prix',
        'mode_payement',
        'comition',
        'date de transaction',
        'bien_id',
        'client_id',
        'user_id',
    ];
}
