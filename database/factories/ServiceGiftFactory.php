<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceGift>
 */
class ServiceGiftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gift_type = $this->faker->randomElement(['RANDOM', 'FIXED']);
        return [
            "gift_type" => $gift_type,
            "image" => $this->faker->imageUrl(),
            "value1" => $this->faker->numberBetween(10, 100),
            "value2" => $gift_type === 'RANDOM' ? $this->faker->numberBetween(101, 999) : null,
            "vip" => $this->faker->randomElement(['YES', 'NO']),
            "cost" => $this->faker->numberBetween(1, 20),
            "percent_random" => $gift_type === 'FIXED' ? $this->faker->numberBetween(1, 50) : null
        ];
    }
}
