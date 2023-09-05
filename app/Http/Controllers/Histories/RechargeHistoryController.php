<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\RechargeUpdateRequest;
use App\Http\Resources\Histories\RechargeHistoryListResource;
use App\Repository\Histories\RechargeHistory\RechargeHistoryInterface;
use Illuminate\Http\Request;

class RechargeHistoryController extends Controller
{
    public function __construct(
        private RechargeHistoryInterface $rechargeHistoryRepository
    ) {
    }

    public function list()
    {
        return RechargeHistoryListResource::collection($this->rechargeHistoryRepository->list(15));
    }

    public function updateRefund($id, RechargeUpdateRequest $request)
    {
        $validated = $request->validated();
        $this->rechargeHistoryRepository->update($id, [
            "refund" => $validated['refund'] ? "YES" : "NO"
        ]);
        return BaseResponse::msg("Đã chuyển đổi thành công!");
    }
}
