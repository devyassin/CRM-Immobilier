<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;
    protected $fillable = [
        'evenement',
        'date',
        'description',
        'rdv_id',
        'user_id',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
