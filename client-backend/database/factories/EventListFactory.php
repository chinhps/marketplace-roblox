<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventList>
 */
class EventListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->name(),
            "image" => $this->faker->imageUrl(640, 480, 'cats', true),
            "active" => $this->faker->randomElement(['ON','OFF'])
        ];
    }
}
