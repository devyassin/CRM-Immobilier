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
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'type' => $this->faker->randomElement(['Buyer', 'Seller','Renter','Big company']),
            'tel' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'email' => $this->faker->email,
            'last_contacted' => $this->faker->dateTimeThisYear,
            'user_id' => User::factory()->create()->id,
        ];
    }
}