<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TacheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['À faire', 'En cours', 'Terminé']),
            'description' => $this->faker->paragraph(),
            'deadline' => $this->faker->date(),
            'user_id' => User::factory()->create()->id,
        ];
    }
}