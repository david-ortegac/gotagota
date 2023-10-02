<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sede>
 */
class SedeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Ibagué', // Puedes ajustar esto según tus necesidades
            'created_by' => 1, // Puedes personalizar el valor del creador
            'modified_by' => 1, // Puedes personalizar el valor del modificador
        ];

    }
}