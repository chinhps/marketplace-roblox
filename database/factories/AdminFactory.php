<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_type' => $this->faker->randomElement(['KOC']),
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'password' => Hash::make($this->faker->password()),
            'remember_token' => null,
            'block' => $this->faker->randomElement(['on', 'off']),
            'active' => $this->faker->randomElement(['on', 'off']),
        ];
    }
}
