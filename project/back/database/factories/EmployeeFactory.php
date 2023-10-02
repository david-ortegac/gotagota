<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'route_id' => $this->faker->randomElement(['1', '2', '3', '4', '5']),
            'name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone' => $this->faker->phoneNumber,
            'photo' => 'default.jpg', // Puedes personalizar el nombre de la imagen
            'created_by' => 1, // Puedes personalizar el valor del creador
            'modified_by' => 1, // Puedes personalizar el valor del modificador
        ];

    }
}