<?php

namespace App\Repository\History\WithdrawHistory;

use App\Models\ShopList;
use App\Models\User;
use App\Models\WithdrawHistory;
use Illuminate\Support\Facades\Auth;

class WithdrawHistoryRepository implements WithdrawHistoryInterface
{
    public function list()
    {
        return WithdrawHistory::where('user_id', Auth::user()->id)
            ->orderBy('id', 'desc')
            ->paginate(10);
    }

    public function create(array $params = [], User $user, ShopList $shop)
    {
        $withdrawHistory = new WithdrawHistory();
        $withdrawHistory->shop()->associate($shop);
        $withdrawHistory->user()->associate($user);
        $withdrawHistory->fill($params);
        $withdrawHistory->save();
        return $withdrawHistory;
    }
}
