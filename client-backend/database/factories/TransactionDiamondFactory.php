<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionDiamond>
 */
class TransactionDiamondFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "diamond" => $this->faker->randomFloat(0, 100, 10000),
            "note" => $this->faker->text(20)
        ];
    }
}
