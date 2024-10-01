<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TopRechargeVirtual>
 */
class TopRechargeVirtualFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "price" => $this->faker->randomFloat(null, 50, 1000),
            "name" => $this->faker->name()
        ];
    }
}
