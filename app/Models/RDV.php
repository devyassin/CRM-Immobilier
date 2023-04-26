<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rdv extends Model
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
    public function user(){
        return $this->belongsTo(User::class);
    }
}
