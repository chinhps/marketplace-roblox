<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WithdrawalLimit>
 */
class WithdrawalLimitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "withdraw_limit" => $this->faker->randomFloat(null, 50, 1000),
            "active" => $this->faker->randomElement(["ON", "OFF"]),
        ];
    }
}
