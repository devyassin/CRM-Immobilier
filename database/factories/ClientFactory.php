<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $count = $this->faker->numberBetween($min = 1, $max = 4);
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'type' => implode(',', $this->faker->randomElements(['Acheteur', 'Vendeur', 'Locataire', 'Grande entreprise'], $count)),
            'tel' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'email' => $this->faker->email,
            'last_contacted' => $this->faker->dateTimeThisYear,
            'user_id' => User::factory()->create()->id,
        ];
    }
}