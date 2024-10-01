<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceOdds>
 */
class ServiceOddsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "odds_admin_type" => $this->faker->randomElement(['FIXED', 'RANDOM']),
            "odds_admin" => json_encode([1, 2, 1, 2, 1, 2, 1, 2, 1, 2]),
            "odds_user_type" => $this->faker->randomElement(['FIXED', 'RANDOM']),
            "odds_user" => json_encode([1, 2, 1, 2, 1, 2, 1, 2, 1, 2]),
            "note" => $this->faker->text(10)
        ];
    }
}
