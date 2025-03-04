<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceGroup>
 */
class ServiceGroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "prioritize" => $this->faker->numberBetween(1, 999),
            "name" => $this->faker->name(),
            "active" => "ON", //$this->faker->randomElement(['ON','OFF']),
            "image" => "https://i.imgur.com/RGyMGhs.png", //$this->faker->imageUrl(450, 55, null, true, "Thumb game")
        ];
    }
}
