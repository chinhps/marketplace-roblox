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
        private PurchaseHistoryInterface $purchaseHistoryRepository,
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $admin_id = $request->input('admin_id');
        $account_id = $request->input('account_id');
        $refund = $request->input('refund');

        $filter = [];

        if ($domain) {
            $filter['shop_filter'] = $domain;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($admin_id) {
            $filter['query'][] = ['admin_id', $admin_id];
        }
        if ($account_id) {
            $filter['query'][] = ['account_id', $account_id];
        }
        if ($refund) {
            $filter['query'][] = ['refund', $refund == 1 ? 'YES' : 'NO'];
        }
        return PurchaseHistoryListResource::collection($this->purchaseHistoryRepository->list(15, $filter));
    }

    public function updateRefund($id, PurchaseUpdateRequest $request)
    {
        try {
            $validated = $request->validated();
            $this->purchaseHistoryRepository->update($id, [
                "refund" => $validated['refund'] ? "YES" : "NO"
            ]);
            return BaseResponse::msg("Đã chuyển đổi thành công!");
        } catch (\Exception $e) {
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }
}
