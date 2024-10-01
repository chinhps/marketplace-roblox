<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PushDiamondController extends Controller
{

    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
    ) {
    }

    public function pushDiamond()
    {
        # GET ALL WITHDRAW DIAMOND WITH STATUS = "PENDING" AND GET FIST ROW
        $withdraw = $this->withdrawHistoryRepository->getByConditions([
            ["status", "PENDING"],
            ["withdraw_type", "DIAMOND"],
        ]);

        if (!$withdraw) return BaseResponse::msg("Hết đơn để chạy!");

        # Update status to PROCESSING
        $withdraw->status = "PROCESSING";
        $withdraw->save();

        try {
            $price = $this->convertDiamondToPrice($withdraw->value);
        } catch (\Exception $e) {
            # dont rollback because loop infinity
            logReport("push_diamond_webhook", "{$e->getMessage()} | Data: {$withdraw->id}");
            return BaseResponse::msg($e->getMessage(), 403);
        }

        $apiKey = env("API_KEY_WITHDRAW_DIAMOND_USER");

        # ADMIN USE API KEY ADMIN
        if ($withdraw->user->admin) {
            $apiKey = env("API_KEY_WITHDRAW_DIAMOND_ADMIN");
        }

        $request_id = $withdraw->task_number; // Order ID
        $domain = $withdraw->user->shop->domain;
        $detail = json_decode($withdraw->detail, true);
        $playerIdKey = array_search('id_game', array_column($detail, 'key'));
        if (!is_numeric($playerIdKey)) return BaseResponse::msg("Không tìm thấy id người chơi trong dữ liệu", 403);

        $url = "https://rutkimcuong.club/chargingws/v2?APIkey=" .
            $apiKey . "&playerid=" .
            $detail[$playerIdKey]['value'] . "&menhgia=" .
            $price . "&content=" .
            $request_id . "&ghichu=" .
            $domain;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        curl_setopt($ch, CURLOPT_REFERER, $actual_link);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);

        $obj = json_decode($result, true);

        logReport("push_diamond_webhook", json_encode($result) . " | PUSH | Data: {$withdraw->id}");

        DB::beginTransaction();

        try {
            if (isset($obj['status'])) {
                # SUCCESS
                if ($obj['status'] == "00") {
                    DB::commit();
                    return BaseResponse::msg("Đẩy đơn {$withdraw->id} thành công");
                }
                # CANCEL
                $withdraw->status = "CANCEL";
                $withdraw->save();
                # REFUND DIAMOND FOR USER
                $this->transactionRepository->createDiamond(
                    user: $withdraw->user,
                    value: $withdraw->value,
                    note: "Hoàn kim cương từ PushDiamond, ID HTR: {$withdraw->id}"
                );
                DB::commit();
                return BaseResponse::msg("Đẩy đơn {$withdraw->id} THẤT BẠI");
            }
            # DONT HAVE RESPONSE FROM RUTKIMCUONG
            $withdraw->status = "PENDING";
            $withdraw->save();
            logReport("push_diamond_webhook", json_encode($result) . " | NOTRESPONSE | Data: {$withdraw->id}");
            DB::commit();
            return BaseResponse::msg("Chuyển về trạng thái thường");
            
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("push_diamond_webhook", json_encode($result) . " | 500 CODE | Data: {$withdraw->id}");
            return BaseResponse::msg("500", 500);
        }
    }

    private function convertDiamondToPrice(float $diamond)
    {
        switch ($diamond) {
            case 113:
                $price = 20000;
                break;
            case 283:
                $price = 50000;
                break;
            case 566:
                $price = 100000;
                break;
            case 1132:
                $price = 200000;
                break;
            case 2830:
                $price = 500000;
                break;
            default:
                throw new \Exception("Không thể chuyển thành tiền");
                break;
        }
        return $price;
    }
}
