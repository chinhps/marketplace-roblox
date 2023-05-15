<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceDetail;
use App\Models\ServiceGroup;
use App\Models\ServiceImage;
use App\Models\ServiceOdds;
use App\Models\ShopDetail;
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
        $serviceOdds = ServiceOdds::factory(20)->create();
        $services = Service::all();

        ServiceDetail::factory(15)->create(function () use ($serviceGroups, $serviceImage, $serviceOdds, $services) {

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
    }
}
