<?php

namespace Database\Factories;

use App\Models\ShopList;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'provider_id' => $this->faker->unique()->numberBetween(1000000000, 9999999999),
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'price_temporary' => $this->faker->randomFloat(null, 0, 1000),
            'diamond_temporary' => $this->faker->randomFloat(null, 0, 1000),
            'robux_temporary' => $this->faker->randomFloat(null, 0, 1000),
            'password' => Hash::make("chinhdeptrai012"),
            'remember_token' => null,
            'block' => $this->faker->randomElement(['on', 'off']),
            'active' => $this->faker->randomElement(['on', 'off']),
        ];
    }
}
