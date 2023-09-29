<?php

namespace App\Repository\Account;

use App\Models\AccountList;
use Illuminate\Support\Facades\Auth;

class AccountRepository implements AccountInterface
{
    public function accountDetail(float $idAccount, array $idListAllow)
    {
        return AccountList::whereHas('service.serviceDetails', function ($query) use ($idListAllow) {
            $query->whereIn('id', $idListAllow);
        })->select('id', 'detail_public', 'price', 'status', 'thumb', 'note', 'images', 'service_id')->find($idAccount) ?? false;
    }

    public function recommend(array $idListAllow)
    {
        return AccountList::whereHas('service.serviceDetails', function ($query) use ($idListAllow) {
            $query->whereIn('id', $idListAllow);
        })->where(['status' => 'NOTSELL', 'active' => "YES"])->inRandomOrder()->limit(10)->get() ?? false;
    }

    public function accountDetailGame($idAccount)
    {
        return AccountList::with(['service.game_list', 'service.currency', 'admin'])->find($idAccount) ?? false;
    }

    public function soldAccount(AccountList $account)
    {
        if (!Auth::user()->admin) {
            $account->status = "SOLD";
            $account->save();
        }
        return $account;
    }
}   
