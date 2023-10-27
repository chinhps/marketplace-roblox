<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\EventHistory;
use App\Models\EventList;
use App\Models\NewsList;
use App\Models\RechargeHistory;
use App\Models\RechargeList;
use App\Models\ShopDetail;
use App\Models\ShopList;
use App\Models\TopRecharge;
use App\Models\TopRechargeVirtual;
use App\Models\TransactionDiamond;
use App\Models\TransactionPrice;
use App\Models\User;
use App\Models\WithdrawHistory;
use App\Models\WithdrawType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BaseDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $eventList = EventList::factory(5)->create();

        $rechargeList = RechargeList::factory(1)->create();
        $withdrawTypes = WithdrawType::factory(4)->create();

        ShopList::factory(50)->create()->each(function ($shop) use ($eventList, $rechargeList, $withdrawTypes) {

            # mỗi shop tạo 1 KOC
            Admin::factory(1)->create([
                "shop_id" => $shop->id
            ]);

            # tạo thông tin chi tiết shop
            ShopDetail::factory(1)->create([
                "shop_id" => $shop->id
            ]);

            # tạo người dùng
            $users = User::factory(50)->create([
                "shop_id" => $shop->id
            ])->each(function ($user) use ($shop, $eventList, $rechargeList) {

                # tạo các transaction price
                TransactionPrice::factory(10)->create([
                    "user_id" => $user->id,
                ]);

                # tạo các transaction diamond
                TransactionDiamond::factory(10)->create([
                    "user_id" => $user->id,
                ]);

                # tạo lịch sử chơi event
                EventHistory::factory(1)->create([
                    "user_id" => $user->id,
                    "shop_id" => $shop->id,
                    "event_id" => $eventList->random()->id
                ]);

                # tạo lịch sử nạp
                RechargeHistory::factory(15)->create([
                    "user_id" => $user->id,
                    "shop_id" => $shop->id,
                    "recharge_id" => $rechargeList->random()->id
                ]);
            });

            # tạo top nạp | Mỗi shop tạo 10 lịch sử rút
            $users->splice(0, 10)->each(function ($user) use ($shop) {
                TopRecharge::factory(1)->create([
                    "shop_id" => $shop->id,
                    "user_id" => $user->id
                ]);
            });

            # tạo top nạp ảo | Mỗi shop tạo 5 top ảo
            TopRechargeVirtual::factory(5)->create([
                "shop_id" => $shop->id,
            ]);

            # tạo lịch sử rút | Mỗi shop có 10 lịch sử rút
            $users->each(function ($user) use ($shop, $withdrawTypes) {
                WithdrawHistory::factory(1)->create([
                    "shop_id" => $shop->id,
                    "user_id" => $user->id,
                    "withdraw_type_id" => $withdrawTypes->random()->id
                ]);
            });
        });

        # Tạo ngẫu nhiên 3 ADMIN
        $admins = Admin::factory(5)->create([
            "admin_type" => "ADMIN",
            "shop_id" => rand(1, 10)
        ]);

        # Tạo 15 tin tức
        NewsList::factory(15)->create([
            "admin_id" => $admins->random()->id
        ]);
    }
}
