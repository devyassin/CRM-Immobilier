<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // User::factory(20)->create();
        // User::factory(10)->hasClients(20)->create();
        User::factory(10)->create()->each(function ($user) {
            $user->clients()->saveMany(Client::factory(20)->make());
        });
    }
}