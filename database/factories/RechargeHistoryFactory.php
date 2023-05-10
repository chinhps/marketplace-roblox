<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RechargeHistory>
 */
class RechargeHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "refund" => $this->faker->randomElement(['yes', 'no']),
            "price" => $this->faker->randomElement(['10000', '20000', '30000', '50000', '100000', '200000', '500000']),
            "task_number" => $this->faker->numberBetween(100000, 999999),
            "status" => $this->faker->randomElement(['PENDING', 'ERROR', 'SUCCESS']),
            "ip" => $this->faker->ipv4(),
            "detail" => json_encode(
                [
                    "type" => $this->faker->randomElement(['VIETTEL', 'VINAPHONE', 'MOBIFONE']),
                    "serial" => $this->faker->numberBetween(100000000000, 900000000000),
                    "code" => $this->faker->numberBetween(1000000000000, 9000000000000),
                ]
            )
        ];   
    }
}
