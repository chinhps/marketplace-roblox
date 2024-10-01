<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WebhookDiamondController extends Controller
{

    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
    ) {
    }

    public function webhookDiamond(Request $request)
    {
        $taskId = $request->content;
        $status = $request->status;

        DB::beginTransaction();

        $withdrawHistory = $this->withdrawHistoryRepository->getByConditions([
            "withdraw_type" => "DIAMOND",
            "task_number" => $taskId,
            "status" => "PROCESSING"
        ]);

        if (!$withdrawHistory) {
            logReport("withdraw_webhook", "Không tìm thấy Data | Data: " . json_encode($request->all()));
            return BaseResponse::msg("Không tìm thấy Data", 403);
        }

        try {

            # SUCCESS
            if ($status == "thanhcong") {
                $withdrawHistory->status = "SUCCESS";
                $withdrawHistory->save();
                DB::commit();
                return BaseResponse::msg("Đơn thành công", 200);
            }

            # ERROR
            $withdrawHistory->status = "CANCEL";
            $withdrawHistory->save();

            # REFUND DIAMOND
            $this->transactionRepository->createDiamond(
                user: $withdrawHistory->user,
                value: $withdrawHistory->value,
                note: "Hoàn kim cương từ Webhook, ID HTR: {$withdrawHistory->id}"
            );
            DB::commit();
            return BaseResponse::msg("Đơn thất bại", 403);
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("withdraw_webhook", "Có lỗi gì có xảy ra!", $e);
            return BaseResponse::msg("Có lỗi gì có xảy ra!", 500);
        }
    }
}
