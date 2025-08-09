<?php

namespace App\Http\Controllers\Statistical;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Models\GameList;
use App\Models\PurchaseHistory;
use App\Models\Service;
use App\Models\WithdrawHistory;
use App\Repository\Shop\ShopInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class StatisticalController extends Controller
{

    public function __construct(
        public ShopInterface $shopRepository
    ) {}

    public function byDomain($domain, Request $request)
    {

        if ($request->start_date != "" and $request->end_date != "") {
            $var = $request->start_date;
            $date = str_replace('/', '-', $var);
            $started_at = date('Y-m-d', strtotime($date));
            $var1 = $request->end_date;
            $date1 = str_replace('/', '-', $var1);
            $ended_at = date('Y-m-d', strtotime($date1 . " +1 days"));
        } else {
            $started_at = date('Y-m-01');
            $ended_at = date('Y-m-t', strtotime(date('Y-m-t') . " +1 days"));
        }

        $shop = $this->shopRepository->getByDomain($domain);

        $user = Auth::user();
        if (Gate::allows('koc', $user)) {
            if ($user->shop->domain != $domain) {
                return BaseResponse::msg("Bạn không có quyền kiểm tra tên miền này!", 404);
            }
        }

        if (!$shop) {
            return BaseResponse::msg("Không tồn tại domain này!", 404);
        }

        $purchaseIds = PurchaseHistory::where('shop_id', $shop->id)
            // Thêm where theo tháng tại đây
            ->whereBetween('updated_at', [$started_at, $ended_at])
            ->pluck('account_id')->toArray();

        $gameListIds = GameList::whereIn('game_key', ['ACCOUNT', 'RANDOM'])->pluck('id')->toArray();

        $queryServiceAccount = function ($query) use ($purchaseIds) {
            $query->where('status', 'SOLD')->whereIn('id', $purchaseIds);
        };

        $serviceAccounts = Service::withSum(['accounts' => $queryServiceAccount], 'price')
            ->withCount(['accounts' => $queryServiceAccount])
            ->whereHas('accounts', $queryServiceAccount)
            ->with('game_list')
            ->whereIn('game_id', $gameListIds)->get();

        # 'DIAMOND'
        $withdrawHistoriesDiamond = WithdrawHistory::where('shop_id', $shop->id)
            ->whereIn('withdraw_type', ['DIAMOND'])
            ->where('status', 'SUCCESS')
            ->selectRaw('withdraw_type,value as parcel, COUNT(value) as total')
            // Thêm where theo tháng tại đây
            ->whereBetween('updated_at', [$started_at, $ended_at])
            ->groupBy('withdraw_type', 'value')
            ->get();


        # 'GAMEPASS'
        $withdrawHistoriesGamePass = WithdrawHistory::where('shop_id', $shop->id)
            ->whereIn('withdraw_type', ['GAMEPASS'])
            ->where('status', 'SUCCESS')
            ->selectRaw('
                withdraw_type, 
                cost_type,
                SUM(cost) AS total
            ')
            // Thêm where theo tháng tại đây
            ->whereBetween('updated_at', [$started_at, $ended_at])
            ->groupBy('withdraw_type', 'cost_type')
            ->get();

        # 'UNITS & GEMS'
        $withdrawHistoriesUnits = WithdrawHistory::where('shop_id', $shop->id)
            ->whereIn('withdraw_type', ['UNIT', 'GEMS'])
            ->where('status', 'SUCCESS')
            ->selectRaw('
                withdraw_type, 
                cost_type,
                SUM(cost) AS total
            ')
            // Thêm where theo tháng tại đây
            ->whereBetween('updated_at', [$started_at, $ended_at])
            ->groupBy('withdraw_type', 'cost_type')
            ->get();

        # 'ROBUX', 'BUY_ROBUX'
        $withdrawHistoriesRobux = WithdrawHistory::where('shop_id', $shop->id)
            ->whereIn('withdraw_type', ['ROBUX', 'BUY_ROBUX'])
            ->where('status', 'SUCCESS')
            ->selectRaw('withdraw_type, SUM(value) as total')
            // Thêm where theo tháng tại đây
            ->whereBetween('updated_at', [$started_at, $ended_at])
            ->groupBy('withdraw_type')
            ->get();

        return [
            'withdraws' => [
                "gamepass" => $withdrawHistoriesGamePass,
                "robux" => $withdrawHistoriesRobux,
                "diamond" => $withdrawHistoriesDiamond,
                "units" => $withdrawHistoriesUnits
            ],
            'accounts' => $serviceAccounts
        ];
    }

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
        $dataChart = DB::table('recharge_histories')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(price) as sum_price'))
            ->where('status', "SUCCESS");


        $user = Auth::user();

        if (Gate::allows('ctv', $user)) {
            $dataChart = DB::table('purchase_histories')
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(price) as sum_price'))
                ->where('admin_id', $user->id)
                ->where('refund', "NO");
        }

        if (Gate::allows('koc', $user)) {
            $dataChart = $dataChart->where('shop_id', $user->user_id);
        }

        $dataChart = $dataChart->whereBetween('created_at', [$weekStart, $weekEnd])
            ->groupBy('date')
            ->get()
            ->pluck('sum_price', 'date')
            ->toArray();

        $result = [];
        foreach ($allDates as $date) {
            $result[] = isset($dataChart[$date]) ? $dataChart[$date] : 0;
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
        if (Gate::allows('koc', $user)) {
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
        $user = Auth::user();
        $dataResponse = [];
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

        if (Gate::allows('koc', $user)) {
            $purchase = $purchase->where('shop_id', $user->shop_id);
            $service = $service->where('shop_id', $user->shop_id);
            $recharge = $recharge->where('shop_id', $user->shop_id);
            $withdraw = $withdraw->where('shop_id', $user->shop_id);
            $users = $users->where('shop_id', $user->shop_id);
        }
        if (Gate::allows('koc', $user) || Gate::allows('admin', $user)) {
            $dataResponse = [[
                "label" => "Mua tài khoản",
                "value" => $purchase->count()
            ], [
                "label" => "Lượt chơi game",
                "value" => $service->count()
            ], [
                "label" => "Nạp thẻ",
                "value" => $recharge->count()
            ], [
                "label" => "Rút vật phẩm",
                "value" => $withdraw->count()
            ], [
                "label" => "Tài khoản mới",
                "value" => $users->count()
            ]];
        }
        if (Gate::allows('ctv', $user)) {

            $purchase = DB::table('purchase_histories')
                ->where('admin_id', $user->id)->where('refund', "NO");

            $dataResponse = [
                [
                    "label" => "Acc đã bán (Hôm nay)",
                    "value" => (clone $purchase)->whereDate('created_at', now()->format('Y-m-d'))->count()
                ],
                [
                    "label" => "Acc đã bán (Tháng)",
                    "value" => (clone $purchase)->whereYear('created_at', date('Y'))->whereMonth('created_at', date('m'))->count()
                ],
                [
                    "label" => "Acc đã bán (Tổng)",
                    "value" => (clone $purchase)->count()
                ],
                [
                    "label" => "Giá trị acc (Tổng)",
                    "value" => (clone $purchase)->sum('price')
                ]
            ];

            $accounts = DB::table('account_list')
                ->where('status', 'NOTSELL')
                ->where('admin_id', $user->id);

            $dataResponse[] = [
                "label" => "Số acc đang treo",
                "value" => (clone $accounts)->count()
            ];
            $dataResponse[] = [
                "label" => "Giá trị acc đang treo",
                "value" => (clone $accounts)->sum('price')
            ];
        }
        return BaseResponse::data($dataResponse);
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

        if (Gate::allows('ctv', $user)) {
            $purchase = DB::table('purchase_histories')
                ->where('admin_id', $user->id);

            return BaseResponse::data([
                "month" => (clone $purchase)->whereYear('created_at', date('Y'))->whereMonth('created_at', date('m'))->sum('price'),
                "day" => (clone $purchase)->whereDate('created_at', now()->format('Y-m-d'))->sum('price')
            ]);
        }

        if (!Gate::allows('admin', $user)) {
            $month = $month->where('shop_id', $user->shop_id);
            $day = $day->where('shop_id', $user->shop_id);
        }
        return BaseResponse::data([
            "month" => $month->sum('price'),
            "day" => $day->sum('price')
        ]);
    }
}
