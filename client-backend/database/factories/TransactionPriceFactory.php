<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionPrice>
 */
class TransactionPriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "price" => $this->faker->randomFloat(0, 10000, 100000),
            "note" => $this->faker->text(20)
        ];
    }
}
