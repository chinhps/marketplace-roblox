<?php

namespace App\Http\Controllers\Withdraw;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Withdraw\WithdrawBuyRobuxRequest;
use App\Http\Requests\Withdraw\WithdrawRobuxRequest;
use App\Repository\History\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class WithdrawRobuxController extends Controller
{

    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
    ) {
    }

    public function robux(WithdrawRobuxRequest $request)
    {
        $validated = $request->validated();
        $robux = HandleHelper::getNumberWithdrawRobux($validated['type_withdraw']);
        $linkPass = $validated['linkpass'];

        DB::beginTransaction();

        $currentRobux = $this->transactionRepository->getRobux(Auth::user());
        if ($currentRobux <= 0) {
            return BaseResponse::msg("Tài khoản của bạn hết Robux!", 403);
        }
        if ($currentRobux < $robux) {
            return BaseResponse::msg("Tài khoản của bạn không đủ Robux để rút!", 403);
        }

        try {
            # save to history
            $requestId = rand(100000000, 999999999); # Order ID
            $history = $this->withdrawHistoryRepository->create([
                "task_number" => $requestId,
                "withdraw_type" => "ROBUX",
                "value" => $robux,
                "status" => "PENDING",
                "cost" => 0,
                "detail" => json_encode([
                    ["key" => "link", "name" => "Đường dẫn", "value" => $linkPass],
                ])
            ], user: Auth::user(), shop: Auth::user()->shop);
            # create minus robux at transaction
            $this->transactionRepository->createRobux($robux * -1, "Rút robux, ID HTR: {$history->id}");

            DB::commit();
            return BaseResponse::msg("Rút Robux thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("withdraw_errors", "Rút robux", $e);
            return BaseResponse::msg('Có lỗi xảy ra khi thực hiện rút vui lòng thao tác lại!', 500);
        }
    }

    public function buy_robux(WithdrawBuyRobuxRequest $request)
    {
        $validated = $request->validated();
        $robux = (HandleHelper::getNumberBuyRobux($validated['type_withdraw']))['robux'];
        $price = (HandleHelper::getNumberBuyRobux($validated['type_withdraw']))['cash'];
        $linkPass = $validated['linkpass'];

        DB::beginTransaction();

        $currentPrice = $this->transactionRepository->getPrice(Auth::user());
        if ($currentPrice <= 0) {
            return BaseResponse::msg("Tài khoản của bạn đã hết tiền!", 403);
        }
        if ($currentPrice < $price) {
            return BaseResponse::msg("Tài khoản của bạn không đủ tiền để mua!", 403);
        }

        try {
            # save to history
            $requestId = rand(100000000, 999999999); # Order ID
            $history = $this->withdrawHistoryRepository->create([
                "task_number" => $requestId,
                "withdraw_type" => "BUY_ROBUX",
                "value" => $robux,
                "status" => "PENDING",
                "cost" => 100,
                "detail" => json_encode([
                    ["key" => "link", "name" => "Đường dẫn", "value" => $linkPass],
                ])
            ], user: Auth::user(), shop: Auth::user()->shop);
            # create minus robux at transaction
            $this->transactionRepository->createPrice($price * -1, "Mua robux, ID HTR: {$history->id}");

            DB::commit();
            return BaseResponse::msg("Mua Robux thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("withdraw_errors", "Mua robux", $e);
            return BaseResponse::msg('Có lỗi xảy ra khi mua vui lòng thao tác lại!', 500);
        }
    }
}

class HandleHelper
{

    // try {
    //     $checkLinkToRobux = HandleHelper::checkLink($linkPass);
    //     if ($checkLinkToRobux != $robux) {
    //         return BaseResponse::msg('Link Gamepass của bạn đã sai số lượng robux! Vui lòng kiểm tra lại hoặc liên hệ Admin để được hỗ trợ.', 403);
    //     }
    // } catch (\Exception $e) {
    //     return BaseResponse::msg('Link Gamepass của bạn không chính xác! Vui lòng kiểm tra lại hoặc liên hệ Admin để được hỗ trợ.', 500);
    // }

    public static function checkLink($link)
    {
        $html = Http::get($link)->body();
        preg_match('/data-expected-price="(.*?)"/', $html, $matches);
        $expected_price = $matches[1];
        return $expected_price;
    }

    public static function getNumberBuyRobux($id)
    {
        $robux  = 0;
        $rate_roblox = 90;
        $cash  = 0;
        switch ($id) {
            case 1:
                $robux = $rate_roblox * 1;
                $cash = 10000;
                break;
            case 2:
                $robux = $rate_roblox * 2;
                $cash = 20000;
                break;
            case 3:
                $robux = $rate_roblox * 3;
                $cash = 30000;
                break;
            case 4:
                $robux = $rate_roblox * 5;
                $cash = 50000;
                break;
            case 5:
                $robux = $rate_roblox * 10;
                $cash = 100000;
                break;
            case 6:
                $robux = $rate_roblox * 20;
                $cash = 200000;
                break;
            case 7:
                $robux = $rate_roblox * 30;
                $cash = 300000;
                break;
            case 8:
                $robux = $rate_roblox * 50;
                $cash = 500000;
                break;
            default:
                break;
        }
        return [
            'robux' => $robux,
            'cash' => $cash
        ];
    }

    public static function getNumberWithdrawRobux($id)
    {
        $robux  = 0;
        switch ($id) {
            case 1:
                $robux = 200;
                break;
            case 2:
                $robux = 500;
                break;
            case 3:
                $robux = 1000;
                break;
            case 4:
                $robux = 2000;
                break;
            case 5:
                $robux = 3000;
                break;
            case 6:
                $robux = 5000;
                break;
            default:
                break;
        }
        return $robux;
    }
}
