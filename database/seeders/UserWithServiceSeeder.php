<?php

namespace Database\Seeders;

use App\Models\AccountList;
use App\Models\Admin;
use App\Models\GameList;
use App\Models\PurchaseHistory;
use App\Models\Service;
use App\Models\ServiceHistory;
use App\Models\ServiceHistoryVirtual;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserWithServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = Service::all();
        ServiceHistoryVirtual::factory(60)->create([
            "service_id" => $services->random()->id,
        ]);

        $services_game = GameList::with('services')->whereIn('game_key', ['LUCKY_BOX', 'LUCKY_CARD', 'WHEEL'])->get();
        $users = User::all();

        ServiceHistory::factory(250)->create(function () use ($services_game, $users) {
            $currentUser = $users->random();
            return [
                "service_id" => $services_game->random()->services()->get()->random()->id,
                "user_id" => $currentUser->id,
                "shop_id" => $currentUser->shop_id
            ];
        });

        # service_turns
        $users->random(150)->each(function ($user) use ($services_game) {
            $user->services()->attach($services_game->random()->id);
        });

        # account_list
        $services_account = GameList::with('services')->whereIn('game_key', ['ACCOUNT'])->get();
        $admins = Admin::all();
        $accountList = AccountList::factory(750)->create([
            "admin_id" => $admins->random()->id,
            "service_id" => $services_account->random()->services()->get()->random()->id
        ]);

        # purchase history
        $accountList = AccountList::where('status', 'SOLD')->get();

        PurchaseHistory::factory(150)->create(function () use ($users, $accountList) {
            $currentUser = $users->random();
            $currentAccount = $accountList->random();
            return [
                "user_id" => $currentUser->id,
                "shop_id" => $currentUser->shop_id,
                "account_id" => $currentAccount->id,
                "admin_id" => $currentAccount->admin_id,
                "price" => $currentAccount->price,
                "detail_public" => $currentAccount->detail_public,
                "detail_private" => $currentAccount->detail_private,
            ];
        });
    }
}
