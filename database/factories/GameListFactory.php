<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameList>
 */
class GameListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $game_key =  $this->faker->unique()->randomElement([
            "ACCOUNT", # MUA BÁN TÀI KHOẢN (FF, LQ, RB)
            "CATEGORY", # DANH MỤC CHỨA NHIỀU CON BÊN TRONG (KHÔNG PHẢI LÀ GAME)
            "RANDOM", # CÁC DẠNG RANDOM
            "LINKTO", # CHUYỂN HƯỚNG ĐẾN ĐƯỜNG DẪN
            # GAME
            "WHEEL", # VÒNG QUAY
            "LUCKY_BOX", # MỞ HỘP QUÀ
            "LUCKY_CARD", # LẬT HÌNH
            "BOX" # các loại hòm
        ]);
        return [
            "game_key" => $game_key,
            "game_name" => $this->faker->name(),
            "is_game" => ($game_key == "WHEEL" | $game_key == "LUCKY_BOX" | $game_key == "LUCKY_CARD") ? true : false
        ];
    }
}
