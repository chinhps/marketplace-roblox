<?php

namespace Database\Seeders;

use App\Models\Plugin;
use App\Models\ShopList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PluginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop_list = ShopList::all();

        Plugin::factory(30)->create()->each(function ($plugin) use ($shop_list) {
            if (rand(1, 10) > 5) {
                $randomShop = $shop_list->random(20)->pluck('id');
                $plugin->shop_list()->attach($randomShop);
            }
        });
    }
}
