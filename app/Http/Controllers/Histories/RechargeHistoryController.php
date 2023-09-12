<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\RechargeUpdateRequest;
use App\Http\Resources\Histories\RechargeHistoryListResource;
use App\Repository\Histories\RechargeHistory\RechargeHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RechargeHistoryController extends Controller
{
    public function __construct(
        private RechargeHistoryInterface $rechargeHistoryRepository,
        private TransactionInterface $transactionRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $serialCode = $request->input('serialCode');
        $refund = $request->input('refund');
        $status = $request->input('status');

        $filter = [];

        if ($domain) {
            $filter['shop_filter'] = $domain;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($serialCode) {
            $filter['query'][] = ['detail', 'like', "%$serialCode%"];
        }
        if ($refund) {
            $filter['query'][] = ['refund', $refund == 1 ? 'YES' : 'NO'];
        }
        if ($status) {
            $filter['query'][] = ['status', $status];
        }

        return RechargeHistoryListResource::collection($this->rechargeHistoryRepository->list(15, $filter));
    }

    public function updateRefund($id, RechargeUpdateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $recharge = $this->rechargeHistoryRepository->get($id);
            if ($recharge->status == "ERROR" && $recharge->refund == "no") {

                /**
                 * @var \App\Models\User
                 */
                $user = $recharge->user;

                $this->rechargeHistoryRepository->update($id, [
                    "refund" => $validated['refund'] ? "yes" : "no"
                ]);
                $this->transactionRepository->createPrice(
                    $user,
                    $recharge->price,
                    "Hoàn tiền từ nạp thẻ #{$recharge->id}, ADMIN:" . Auth::id()
                );
                DB::commit();
                return BaseResponse::msg("Đã chuyển đổi thành công!");
            }
            return BaseResponse::msg("Không thể thao tác với trường hợp này!", 406);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi xảy ra vui lòng liên hệ admin!", 500);
        }
    }
}
