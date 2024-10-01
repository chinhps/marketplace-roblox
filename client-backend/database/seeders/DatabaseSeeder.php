<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(BaseDataSeeder::class);
        $this->call(ServicesSeeder::class);
        $this->call(ServiceDetailSeeder::class);
        $this->call(UserWithServiceSeeder::class);
        $this->call(PluginSeeder::class);
        $this->call(WithdrawLimitSeeder::class);
    }
}
