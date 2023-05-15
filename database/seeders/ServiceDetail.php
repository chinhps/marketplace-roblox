<?php

namespace Database\Seeders;

use App\Models\ServiceGroup;
use App\Models\ServiceImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceDetail extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceGroup::factory(5)->create();
        ServiceImage::factory(20)->create();
    }
}
