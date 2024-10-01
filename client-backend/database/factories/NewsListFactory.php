<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NewsList>
 */
class NewsListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "thumb" => $this->faker->imageUrl(640,480,null,true, "Thumbnail"),
            "news_title" => $this->faker->text(50),
            "content" => $this->faker->text(),
            "keyword" => collect($this->faker->words(5))->implode(', ')
        ];
    }
}
