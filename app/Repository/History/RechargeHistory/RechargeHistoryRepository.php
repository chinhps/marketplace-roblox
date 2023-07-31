<?php

namespace App\Repository\History\RechargeHistory;

use App\Models\RechargeHistory;
use Illuminate\Support\Facades\Auth;

class RechargeHistoryRepository implements RechargeHistoryInterface
{
    public function list()
    {
        return RechargeHistory::where('user_id', Auth::user()->id)
            ->orderBy('id', 'desc')
            ->with(['recharge'])
            ->paginate(10);
    }
}
