<?php

namespace Database\Seeders;

use App\Models\GameCurrency;
use App\Models\GameList;
use App\Models\Service;
use App\Models\ServiceCounter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        # Tạo 7 games
        $gameList = GameList::factory(8)->create();

        # Tạo 4 đơn vị
        $gameCurrencies = GameCurrency::factory(3)->create()->pluck('id','currency_key');

        # Tạo 15 game
        $services = Service::factory(100)->create(function () use ($gameList, $gameCurrencies) {

            # random loại trò chơi
            $game_id = $gameList->random();
            return [
                "game_id" => $game_id->id,
                "game_currency_id" => match ($game_id->game_key) {
                    "BOX" => $gameCurrencies['ROBUX'],
                    "LUCKY_CARD" => $gameCurrencies['ROBUX'],
                    "LUCKY_BOX" => $gameCurrencies['DIAMOND'],
                    "WHEEL" => $gameCurrencies['ROBUX'],
                    default => null
                },
            ];
        });

        $services->each(function ($service) {
            ServiceCounter::factory(1)->create([
                "service_id" => $service->id
            ]);
        });

    }
}
