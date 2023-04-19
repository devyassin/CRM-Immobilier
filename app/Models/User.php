<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable 
{
    use HasApiTokens, HasFactory, Notifiable;

  

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

   
    protected $hidden = [
        'password',
        'remember_token',
    ];

    
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    public function clients(){
        return $this->hasMany(Client::class);
    }
    public function devis(){
        return $this->hasMany(Devis::class);
    }
    public function factures(){
        return $this->hasMany(Facture::class);
    }
    public function leads(){
        return $this->hasMany(Lead::class);
    }

    public function biens(){
        return $this->hasMany(Bien::class);
    }

    public function taches(){
        return $this->hasMany(Tache::class);
    }
    // public function bonDeVisits(){
    //     return $this->hasMany(BonDeVisite::class);
    // }
    // public function biens(){
    //     return $this->hasMany(Bien::class);
    // }
    // public function rdvs(){
    //     return $this->hasMany(RDV::class);
    // }
    // public function agendas(){
    //     return $this->hasMany(Agenda::class);
    // }
    // public function transactions(){
    //     return $this->hasMany(Transaction::class);
    // }
    // public function taches(){
    //     return $this->hasMany(Tache::class);
    // }
    // public function getJWTIdentifier()
    // {
    //     return $this->getKey();
    // }

    // /**
    //  * Return a key value array, containing any custom claims to be added to the JWT.
    //  *
    //  * @return array
    //  */
    // public function getJWTCustomClaims()
    // {
    //     return [];
    // }
}