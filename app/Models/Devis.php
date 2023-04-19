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
    public function bien(){
        return $this->hasMany(Bien::class);
    }
}
