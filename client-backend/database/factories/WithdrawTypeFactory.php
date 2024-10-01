<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WithdrawType>
 */
class WithdrawTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "type_key" => $this->faker->randomElement(['ROBUX', 'DIAMOND', 'BUY_ROBUX', 'GAMEPASS']),
            "name" => $this->faker->name(),
        ];
    }
}
