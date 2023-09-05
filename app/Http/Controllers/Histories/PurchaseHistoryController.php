<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\PurchaseUpdateRequest;
use App\Http\Resources\Histories\PurchaseHistoryListResource;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use Illuminate\Http\Request;

class PurchaseHistoryController extends Controller
{
    public function __construct(
        private PurchaseHistoryInterface $purchaseHistoryRepository
    ) {
    }

    public function list()
    {
        return PurchaseHistoryListResource::collection($this->purchaseHistoryRepository->list(15));
    }

    public function updateRefund($id, PurchaseUpdateRequest $request)
    {
        $validated = $request->validated();
        $this->purchaseHistoryRepository->update($id, [
            "refund" => $validated['refund'] ? "YES" : "NO"
        ]);
        return BaseResponse::msg("Đã chuyển đổi thành công!");
    }
}
