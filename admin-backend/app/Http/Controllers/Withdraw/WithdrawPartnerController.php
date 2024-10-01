<?php

namespace App\Http\Controllers\Withdraw;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Withdraw\StatusUpdateWithdrawPartnerRequest;
use App\Http\Requests\Withdraw\WithdrawPartnerRequest;
use App\Http\Resources\Withdraw\WithdrawPartnerResource;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\WithdrawPartner\WithdrawPartnerInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WithdrawPartnerController extends Controller
{
    public function __construct(
        private WithdrawPartnerInterface $withdrawPartnerRepository,
        private PurchaseHistoryInterface $purchaseHistoryRepository
    ) {}

    public function list()
    {
        $data = $this->withdrawPartnerRepository->list();
        return WithdrawPartnerResource::collection($data);
    }

    public function statusUpdate(StatusUpdateWithdrawPartnerRequest $request)
    {
        $admin = Auth::user();
        $validated = $request->validated();
        try {
            DB::beginTransaction();
            $this->withdrawPartnerRepository->updateOrInsert($validated['id'], [
                "status" => $validated['status']
            ], $admin);
            DB::commit();
            return BaseResponse::msg("Cập nhật thành công! {$validated['status']}");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    public function create(WithdrawPartnerRequest $request)
    {
        $admin = Auth::user();
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            /**
             * @var float
             */
            $allAmount = $this->purchaseHistoryRepository->allAmountPartner($admin);
            $currentAmount = $this->withdrawPartnerRepository->getCurrentAmount($admin, $allAmount);

            if ($currentAmount < $validated['amount']) {
                DB::rollBack();
                return BaseResponse::msg("Bạn không đủ tiền để rút! Số dư hiện tại: {$currentAmount}", 406);
            }

            $this->withdrawPartnerRepository->updateOrInsert(null, [
                "note" => $validated['note'],
                "amount" => $validated['amount'],
                "status" => "PENDING"
            ],  $admin);

            DB::commit();
            return BaseResponse::msg("Tạo lệnh thành công! {$validated['amount']}");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }
}
