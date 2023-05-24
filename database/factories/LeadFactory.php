<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
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
            'tel' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'email' => $this->faker->email,
            'status' => implode(',', $this->faker->randomElements(['Nouveau', 'Contacté', 'Intéressé', 'Programmé une visite'], $count)),
            'lead_source'=>  $this->faker->randomElement(['référence', 'en ligne', 'médias sociaux', 'portes ouvertes']),
            'user_id' => User::factory()->create()->id,
        ];
    }
}