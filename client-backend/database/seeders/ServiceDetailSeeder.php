<?php

namespace Database\Seeders;

use App\Models\GameCurrency;
use App\Models\Service;
use App\Models\ServiceDetail;
use App\Models\ServiceGift;
use App\Models\ServiceGroup;
use App\Models\ServiceImage;
use App\Models\ServiceOdds;
use App\Models\ShopDetail;
use App\Models\ShopList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceGroups = ServiceGroup::factory(5)->create();
        $serviceImage = ServiceImage::factory(20)->create();

        $gameCurrency = GameCurrency::all();
        # tạo tỷ lệ và các quà trong tỷ lệ
        $serviceOdds = ServiceOdds::factory(20)->create()->each(function ($odds) use ($gameCurrency) {
            $currentCurrency = $gameCurrency->random();
            ServiceGift::factory(10)->create([
                "odds_id" => $odds->id,
                "game_currency_id" => $currentCurrency->id
            ]);
        });

        $services = Service::all();
        $shopList = ShopList::all();

        $serviceDetail = ServiceDetail::factory(15)->create(function () use ($serviceGroups, $serviceImage, $serviceOdds, $services) {

            $currentServices = $services->random();

            $service_odds_id = match ($currentServices->game_list->game_key) {
                "LUCKY_CARD" => $serviceOdds->random()->id,
                "LUCKY_BOX" => $serviceOdds->random()->id,
                "WHEEL" => $serviceOdds->random()->id,
                default => null
            };

            return [
                "service_group_id" => $serviceGroups->random()->id,
                "service_id" => $currentServices->id,
                "service_odds_id" => $service_odds_id,
                "service_image_id" => $serviceImage->random()->id
            ];
        });

        # tạo liên kết ngẫu nhiên
        for ($i = 0; $i < rand(10, 20); $i++) {
            $serviceDetail->random()->shop_list()->attach($shopList->random());
        }
    }
}
