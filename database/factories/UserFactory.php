<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'age' => $this->faker->numberBetween(18, 65),
            'role' => $this->faker->randomElement(['admin', 'user']),
            'address' => $this->faker->address,
            'email' => $this->faker->unique()->safeEmail,
            'type' => $this->faker->randomElement(['agent', 'broker',"promoteur"]),
            'password' => bcrypt('password'), // default password for all users
            'tel' => $this->faker->phoneNumber,
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'payment_status' => $this->faker->randomElement(['paid', 'unpaid']),
        ];
    }
}