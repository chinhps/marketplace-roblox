<?php

namespace App\Repository\History\WithdrawHistory;

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
}
