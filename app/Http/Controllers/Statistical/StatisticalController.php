<?php

namespace App\Http\Controllers\Statistical;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class StatisticalController extends Controller
{

    public function charts()
    {
        return BaseResponse::data([
            "recharge_chart" => $this->rechargeChart(),
            "user_chart" => $this->userChart()
        ]);
    }

    private function rechargeChart()
    {
        $weekStart = now()->startOfWeek();
        $weekEnd = now()->endOfWeek();
        $allDates = [];
        $currentDate = $weekStart->copy();
        while ($currentDate <= $weekEnd) {
            $allDates[] = $currentDate->toDateString();
            $currentDate->addDay();
        }
        $rechargeSum = DB::table('recharge_histories')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(price) as sum_price'))
            ->where('status', "SUCCESS");


        $user = Auth::user();
        if (!Gate::allows('admin', $user)) {
            $rechargeSum = $rechargeSum->where('shop_id', $user->user_id);
        }

        $rechargeSum = $rechargeSum->whereBetween('created_at', [$weekStart, $weekEnd])
            ->groupBy('date')
            ->get()
            ->pluck('sum_price', 'date')
            ->toArray();

        $result = [];
        foreach ($allDates as $date) {
            $result[] = isset($rechargeSum[$date]) ? $rechargeSum[$date] : 0;
        }
        return $result;
    }

    private function userChart()
    {
        $weekStart = now()->startOfWeek();
        $weekEnd = now()->endOfWeek();
        $allDates = [];
        $currentDate = $weekStart->copy();
        while ($currentDate <= $weekEnd) {
            $allDates[] = $currentDate->toDateString();
            $currentDate->addDay();
        }
        $userCounts = DB::table('users')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'));

        $user = Auth::user();
        if (!Gate::allows('admin', $user)) {
            $userCounts = $userCounts->where('shop_id', $user->user_id);
        }
        $userCounts = $userCounts->whereBetween('created_at', [$weekStart, $weekEnd])
            ->groupBy('date')
            ->get()
            ->pluck('count', 'date')
            ->toArray();

        $result = [];
        foreach ($allDates as $date) {
            $result[] = isset($userCounts[$date]) ? $userCounts[$date] : 0;
        }
        return $result;
    }

    public function service()
    {
        $purchase = DB::table('purchase_histories')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'));

        $service = DB::table('service_histories')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'));

        $recharge = DB::table('recharge_histories')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'))
            ->where('status', 'SUCCESS');

        $withdraw = DB::table('withdraw_histories')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'));

        $users = DB::table('users')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'));

        $user = Auth::user();
        if (!Gate::allows('admin', $user)) {
            $purchase = $purchase->where('shop_id', $user->user_id);
            $service = $service->where('shop_id', $user->user_id);
            $recharge = $recharge->where('shop_id', $user->user_id);
            $withdraw = $withdraw->where('shop_id', $user->user_id);
            $users = $users->where('shop_id', $user->user_id);
        }

        return BaseResponse::data([
            "purchase" => $purchase->count(),
            "service" => $service->count(),
            "recharge" => $recharge->count(),
            "withdraw" => $withdraw->count(),
            "user" => $users->count(),
        ]);
    }

    public function revenue()
    {
        $day = DB::table('recharge_histories')
            ->where('status', 'SUCCESS')
            ->whereDate('created_at', now()->format('Y-m-d'));

        $month = DB::table('recharge_histories')
            ->where('status', 'SUCCESS')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'));

        $user = Auth::user();
        if (!Gate::allows('admin', $user)) {
            $month = $month->where('shop_id', $user->user_id);
            $day = $day->where('shop_id', $user->user_id);
        }
        return BaseResponse::data([
            "month" => $month->sum('price'),
            "day" => $day->sum('price')
        ]);
    }
}
