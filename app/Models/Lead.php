<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'status',
        'tel',
        'address',
        'email',
        'lead_source',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}