<?php

namespace App\Repository\History\WithdrawHistory;

use App\Models\ShopList;
use App\Models\User;
use App\Models\WithdrawHistory;
use App\Models\WithdrawType;
use Illuminate\Support\Facades\Auth;

class WithdrawHistoryRepository implements WithdrawHistoryInterface
{
    public function list()
    {
        return WithdrawHistory::where('user_id', Auth::user()->id)
            ->orderBy('id', 'desc')
            ->paginate(10);
    }

    public function create(array $params = [], User $user, ShopList $shop, WithdrawType $withdrawType)
    {
        $withdrawHistory = new WithdrawHistory();
        $withdrawHistory->shop()->associate($shop);
        $withdrawHistory->user()->associate($user);
        $withdrawHistory->withdrawType()->associate($withdrawType);
        $withdrawHistory->fill($params);
        $withdrawHistory->save();
        return $withdrawHistory;
    }

    public function checkLimit(User $user, WithdrawType $withdrawType)
    {
        return WithdrawHistory::where("withdraw_type_id", $withdrawType->id)
            ->where("user_id", $user->id)
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'))
            ->whereIn('status', ['SUCCESS', 'PROCESSING', 'PENDING'])
            ->sum('value');
    }
}
