<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;

class WithdrawExport implements FromView
{
    public function view(): View
    {
        $withdraws = DB::table("withdraw_histories")
            ->whereIn("withdraw_type", ["ROBUX", "BUY_ROBUX"])
            ->where("status", "PENDING")
            ->get();
        return view('WithdrawRobux', [
            'withdraws' => $withdraws
        ]);
    }
}
