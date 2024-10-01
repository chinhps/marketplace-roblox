<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WithdrawalLimit;
use App\Models\WithdrawType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WithdrawLimitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::take(150)->get();
        $withdrawTypes = WithdrawType::all();
        $users->each(function () use ($users, $withdrawTypes) {
            WithdrawalLimit::create(([
                "user_id" => $users->random()->id,
                "withdraw_type_id" => $withdrawTypes->random()->id
            ]));
        });
    }
}
