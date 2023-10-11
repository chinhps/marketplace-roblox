<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\PurchaseUpdateRequest;
use App\Http\Resources\Histories\PurchaseHistoryListResource;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseHistoryController extends Controller
{
    public function __construct(
        private PurchaseHistoryInterface $purchaseHistoryRepository,
        private TransactionInterface $transactionRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $admin_id = $request->input('admin_id');
        $userId = $request->input('user_id');
        $account_id = $request->input('account_id');
        $refund = $request->input('refund');
        $detail = $request->input('detail');

        $filter = [];

        if ($detail) {
            $filter['query'][] = ['detail_private', 'like', "%$detail%"];
        }
        if ($userId) {
            $filter['query'][] = ['user_id', $userId];
        }
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
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            if ($validated['refund'] == false) {
                return BaseResponse::msg("Giao dịch đã được hoàn tiền không thể thao tác!", 406);
            }
            $purchase = $this->purchaseHistoryRepository->update($id, [
                "refund" => $validated['refund'] ? "YES" : "NO"
            ]);
            $this->refundPrice($purchase);
            DB::commit();
            return BaseResponse::msg("Đã chuyển đổi thành công và hoàn tiền thành công!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    private function refundPrice($purchase)
    {
        $this->transactionRepository->createPrice(
            $purchase->user,
            $purchase->price,
            "Hoàn tiền mua tài khoản, Giá: {$purchase->price}, ID History purchase: {$purchase->id}"
        );
    }
}
