<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "service_key" => $this->faker->unique()->userName(),
            "excluding" => "OFF",
            "price" => $this->faker->randomFloat(0, 100, 9999),
            "sale" => $this->faker->numberBetween(0, 50),
            "notification" => $this->faker->text(100),
            "note" => $this->faker->name(),
            "active" => $this->faker->randomElement(['ON', 'OFF']),
            "information" => json_encode([
                "hastag" => $this->faker->randomElement([
                    "percent50", "percent80", "hot", "only"
                ])
            ])
        ];
    }
}
