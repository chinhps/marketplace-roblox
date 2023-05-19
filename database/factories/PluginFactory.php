<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plugin>
 */
class PluginFactory extends Factory
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
            "status" => $this->faker->randomElement(['ON', 'OFF']),
            "excluding" => $this->faker->randomElement(['ON', 'OFF']),
            "information" => json_encode($this->generateInfo($this->faker->numberBetween(2, 15)))
        ];
    }

    public function generateInfo($loop = 5)
    {
        $info = [];
        for ($i = 0; $i < $loop; $i++) {
            $info[] = [
                "key" => $this->faker->userName(),
                "name" =>  $this->faker->name(),
                "type_input" => $this->faker->randomElement(["SELECT", "TEXT", "NUMBER", "TEXTAREA"]),
                "note" => $this->faker->randomElement([null, $this->faker->text(20)]),
                "value" => $this->faker->randomElement([null, $this->faker->numberBetween(10, 20)]),
                "placeholder" => $this->faker->text(20) . '...',
                "list" => $this->faker->randomElement([[], ['Hehe', 'Hihi', 'Hohoho']])
            ];
        }
        return $info;
    }
}
