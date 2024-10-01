<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameCurrency>
 */
class GameCurrencyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "currency_key" => $this->faker->unique()->randomElement([
                "ROBUX",
                "DIAMOND",
                "NOT",
            ]),
            "currency_name" => $this->faker->name()
        ];
    }
}
