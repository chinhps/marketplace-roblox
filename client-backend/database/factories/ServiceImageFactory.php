<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceImage>
 */
class ServiceImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = [];
        for ($i = 1; $i <= 10; $i++) {
            $images["image_$i"] = $this->faker->imageUrl(640, 480, null, true, "Thumb game $i");
        }
        return [
            "name" => $this->faker->text(60),
            "thumb" => "https://i.imgur.com/Owoq65A.png",//$this->faker->imageUrl(640, 480, null, true, "Thumb game"),
            "images" => json_encode($images)
        ];
    }
}
