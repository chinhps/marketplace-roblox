<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WithdrawHistory>
 */
class WithdrawHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $withdraw_type = $this->faker->randomElement(['ROBUX', 'DIAMOND']);
        return [
            "task_number" => $this->faker->numberBetween(1000000, 9999999),
            "withdraw_type" => $withdraw_type,
            "value" => $this->faker->numberBetween(50, 9999),
            "cost" => $this->faker->numberBetween(10, 999),
            "status" => $this->faker->randomElement(['0', '1', '2', '3', '4']),
            "detail" => $withdraw_type === "ROBUX" ?
                '{ "link": "' . $this->faker->url() . '" }'
                : '{"id_game":"' . $this->faker->numberBetween(1000000, 9999999) . '"}'
        ];
    }
}