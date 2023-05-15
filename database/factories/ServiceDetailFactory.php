<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceDetail>
 */
class ServiceDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "prioritize" => $this->faker->numberBetween(1,999),
            "excluding" => $this->faker->randomElement(['ON','OFF'])
        ];
    }
}
