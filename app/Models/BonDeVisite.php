<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonDeVisite extends Model
{
    use HasFactory;
    protected $fillable = [
        'date_visite',
        'raison',
        'accompagnateur',
        'lead_email',
        'NomBien',
        'bien_id',
        'lead_id',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function lead(){
        return $this->belongsTo(Lead::class);
    }
    
    public function bien(){
        return $this->belongsTo(Bien::class);
    }
}