<?php

namespace Database\Factories;

use App\Models\ShopList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopDetail>
 */
class ShopDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shop_title' => $this->faker->sentence(),
            'percent_cash' => $this->faker->numberBetween(0, 100),
            'cash_new_user' => $this->faker->randomFloat(null, 0, 1000),
            'information' => $this->faker->randomElement([
                '{"foo": "bar"}',
                '{"foo": "baz"}',
                '{"foo": "qux"}',
            ]),
        ];
    }
}
