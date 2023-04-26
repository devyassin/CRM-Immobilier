<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevisBiensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devis_biens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('devis_id')->nullable();
            $table->foreign('devis_id')->references('id')->on('devis');
            $table->unsignedBigInteger('bien_id')->nullable();
            $table->foreign('bien_id')->references('id')->on('biens');
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
        Schema::dropIfExists('devis_biens');
    }
}
