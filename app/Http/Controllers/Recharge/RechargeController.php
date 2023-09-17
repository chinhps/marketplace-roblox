<?php

namespace App\Http\Controllers\Recharge;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Recharge\RechargeRequest;
use App\Repository\History\RechargeHistory\RechargeHistoryInterface;
use App\Repository\RechargeList\RechargeListInterface;
use App\Repository\Shop\ShopInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RechargeController extends Controller
{

    public function __construct(
        private RechargeHistoryInterface $rechargeHistoryRepository,
        private ShopInterface $shopRepository,
        private RechargeListInterface $rechargeListRepository
    ) {
    }

    public function recharge(RechargeRequest $request)
    {
        $validated = $request->validated();

        $type = ucwords($validated['card_type']); # type=Viettel, Vinaphone, Mobifone
        $code = (int)$validated['pin'];
        $serial = (int)$validated['serial'];
        $amount = $validated['amount'];

        $checkExists = $this->rechargeHistoryRepository->exists([
            ['key' => 'type', 'value' => $type],
            ['key' => 'serial', 'value' => $serial],
            ['key' => 'code', 'value' => $code],
        ]);

        if ($checkExists) {
            return BaseResponse::msg("Thẻ đã tồn tại trong hệ thống!", 403);
        }

        DB::beginTransaction();

        $requestId = rand(100000000, 999999999); # Order ID

        try {

            $rechargeKey = $this->shopRepository->getByDomain(Auth::user()->shop->domain)->recharge_key;

            $url = "https://clups1.tstprovn.fun/chargingws/v2?APIkey=" . $rechargeKey . "&mathe=" . $code . "&seri=" . $serial . "&type=" . $type . "&menhgia=" . $amount . "&content=" . $requestId;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            //curl_setopt($ch, CURLOPT_POST, 1);
            $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            curl_setopt($ch, CURLOPT_REFERER, $actual_link);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            $out = json_decode(curl_exec($ch));

            logReport("recharge_logs", "Task Number: $requestId | " . json_encode($out));

            if ($out->status == "00") {
                $this->saveHistory($type, $serial, $code, $amount, $requestId, status: "PENDING");
                DB::commit();
                return BaseResponse::msg('Thẻ Đang Chờ Xử Lý ( 30 giây - 1 phút ) Kiểm Tra Tình Trạng Xử Lý Thẻ ở Phần Lịch Xử Nạp Thẻ');
            }

            # maintain or block account 
            if ($out->status == "47" || (int)$out->status == 3) {
                DB::commit();
                return BaseResponse::msg($out->msg, 403);
            }

            $this->saveHistory($type, $serial, $code, $amount, $requestId, status: "ERROR");
            DB::commit();
            return BaseResponse::msg($out->msg, 403);
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("recharge_errors", "Có lỗi gì đó khi nạp thẻ", $e);
            return BaseResponse::msg("Có lỗi xảy ra trong quá trình nạp thẻ! Vui lòng báo Admin!", 500);
        }
    }

    private function saveHistory($type, $serial, $code, $amount, $requestId, $status)
    {
        $this->rechargeHistoryRepository->create(
            [
                "detail" => json_encode([
                    ["key" => "type", "name" => "Loại thẻ", "value" => $type],
                    ["key" => "serial", "name" => "Serial", "value" => $serial],
                    ["key" => "code", "name" => "Mã thẻ", "value" => $code]
                ]),
                "refund" => "no",
                "price" => $amount,
                "task_number" => $requestId,
                "status" => $status,
                "ip" => myIp()
            ],
            user: Auth::user(),
            shop: Auth::user()->shop,
            recharge: $this->rechargeListRepository->getByKey('CARD')
        );
    }
}
