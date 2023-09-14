<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\WithdrawUpdateRequest;
use App\Http\Resources\Histories\WithdrawHistoryListResource;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WithdrawHistoryController extends Controller
{
    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $detail = $request->input('detail');
        $withdrawType = $request->input('withdraw_type');
        $status = $request->input('status');

        $filter = [];

        if ($domain) {
            $filter['shop_filter'] = $domain;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($detail) {
            $filter['query'][] = ['detail', 'like', "%$detail%"];
        }
        if ($withdrawType) {
            $filter['query'][] = ['withdraw_type', $withdrawType];
        }
        if ($status) {
            $filter['query'][] = ['status', $status];
        }

        return WithdrawHistoryListResource::collection($this->withdrawHistoryRepository->list(15, $filter));
    }

    public function updateStatus($id, WithdrawUpdateRequest $request)
    {
        $validated = $request->validated();
        $withdrawCurrent = $this->withdrawHistoryRepository->get($id);

        if ($withdrawCurrent->status === "SUCCESS" || $withdrawCurrent->status === "CANCEL") {
            return BaseResponse::msg("Đơn đã được kết thúc từ trước nên không thể thay đổi", 406);
        }

        DB::beginTransaction();
        try {
            if ($withdrawCurrent->status === "PENDING") {
                $newStatus = $validated['status'] ? "PROCESSING" : "CANCEL";
                $this->updateWithdrawStatus($id, $newStatus);

                # IF STATUS = FALSE THEN REFUND FOR USER
                if (!$validated['status']) {
                    $this->refundForWithdrawType($withdrawCurrent);
                }

                DB::commit();
                return BaseResponse::msg("Robux: Chuyển sang trạng thái -> " . $newStatus);
            }

            if ($withdrawCurrent->withdraw_type === "DIAMOND") {
                $newStatus = $validated['status'] ? "SUCCESS" : "CANCEL";
                $this->updateWithdrawStatus($id, $newStatus);

                # IF STATUS = FALSE THEN REFUND FOR USER
                if (!$validated['status']) {
                    $this->refundForWithdrawType($withdrawCurrent);
                }

                DB::commit();
                return BaseResponse::msg("Diamond: Chuyển sang trạng thái -> " . $newStatus);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi xảy ra vui lòng liên hệ admin!", 500);
        }
    }


    private function updateWithdrawStatus($id, $status)
    {
        $this->withdrawHistoryRepository->update($id, ["status" => $status]);
    }

    private function refundForWithdrawType($withdrawCurrent)
    {
        switch ($withdrawCurrent->withdraw_type) {
            case "BUY_ROBUX":
                $this->refundPrice($withdrawCurrent);
                break;
            case "ROBUX":
                $this->refundRobux($withdrawCurrent);
                break;
            case "DIAMOND":
                $this->refundDiamond($withdrawCurrent);
                break;
        }
    }

    private function refundPrice($withdrawCurrent)
    {
        $this->transactionRepository->createPrice(
            $withdrawCurrent->user,
            $withdrawCurrent->cost * $withdrawCurrent->value,
            "Hoàn tiền khi rút Robux, Cost: {$withdrawCurrent->cost}, ID Withdraw: {$withdrawCurrent->id}"
        );
    }

    private function refundRobux($withdrawCurrent)
    {
        $this->transactionRepository->creaeteRobux(
            $withdrawCurrent->user,
            $withdrawCurrent->value,
            "Hoàn Robux khi rút Robux, ID Withdraw: {$withdrawCurrent->id}"
        );
    }

    private function refundDiamond($withdrawCurrent)
    {
        $this->transactionRepository->createDiamond(
            $withdrawCurrent->user,
            $withdrawCurrent->value,
            "Hoàn Diamond khi rút Diamond, ID Withdraw: {$withdrawCurrent->id}"
        );
    }
}
