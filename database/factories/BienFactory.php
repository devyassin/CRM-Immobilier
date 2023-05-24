<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class BienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'NomBien' => $this->faker->name,
            'address' => $this->faker->address,
            'type' => $this->faker->randomElement(['Appartement', 'Maison individuelle', 'Maison mitoyenne', 'Maison de ville', 'Maison de campagne', 'Ferme', 'Studio', 'Duplex', 'Triplex', 'Loft', 'Penthouse', 'Château', 'Manoir', 'Villa', 'Bungalow', 'Terrain', 'Garage', 'Parking','Autres']),
            'description' => $this->faker->paragraphs(1, true),
            'location' => $this->faker->city,
            'price' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 10000, $max = 1000000),
            'status' => $this->faker->randomElement(['disponible', 'en location', 'vendu']),
            'comission' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0.01, $max = 0.4),
            'client_id' => Client::factory()->create()->id,
            'user_id' => User::factory()->create()->id,
        ];
    }
}