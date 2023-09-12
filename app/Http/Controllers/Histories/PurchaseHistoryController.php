<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\PurchaseUpdateRequest;
use App\Http\Resources\Histories\PurchaseHistoryListResource;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\Shop\ShopInterface;
use Illuminate\Http\Request;

class PurchaseHistoryController extends Controller
{
    public function __construct(
        private PurchaseHistoryInterface $purchaseHistoryRepository,
        private ShopInterface $shopRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $user_id = $request->input('user_id');
        $admin_id = $request->input('admin_id');
        $account_id = $request->input('account_id');
        $refund = $request->input('refund');

        $filter = [];

        if ($domain) {
            $shop = $this->shopRepository->list(1, [
                "query" => [
                    ['domain', 'like', "%$domain%"]
                ]
            ]);
            $filter['query'][] = ['shop_id', $shop->id ?? null];
        }
        if ($user_id) {
            $filter['query'][] = ['user_id', $user_id];
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
