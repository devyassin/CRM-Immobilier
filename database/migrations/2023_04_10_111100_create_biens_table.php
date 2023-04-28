<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBiensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('biens', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->enum('type', ['Appartement', 'Maison individuelle', 'Maison mitoyenne', 'Maison de ville', 'Maison de campagne', 'Ferme', 'Studio', 'Duplex', 'Triplex', 'Loft', 'Penthouse', 'Château', 'Manoir', 'Villa', 'Bungalow', 'Terrain', 'Garage', 'Parking','Autres']);
            $table->text('description');
            $table->string('location');
            $table->string('price');
            $table->string('image');
            $table->enum('status',['disponible','en location','vendu']);
            $table->string('comission');
            $table->bigInteger('client_id')->unsigned();
            $table->foreign('client_id')->references('id')->on('clients');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('biens');
    }
}