<?php

namespace Database\Factories;

use App\Models\ShopDetail;
use App\Models\ShopList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopList>
 */
class ShopListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stt' => $this->faker->numberBetween(1, 100),
            'domain' => $this->faker->unique()->randomElement([
                'localhost',
                $this->faker->unique()->domainName()
            ]),
            'shop' => $this->faker->word,
        ];
    }
}
