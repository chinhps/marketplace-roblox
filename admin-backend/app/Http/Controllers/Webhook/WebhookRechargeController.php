<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repository\Histories\RechargeHistory\RechargeHistoryInterface;
use App\Repository\Plugin\PluginInterface;
use App\Repository\TopRecharge\TopRechargeInterface;
use App\Repository\Transaction\TransactionInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WebhookRechargeController extends Controller
{
    public function __construct(
        private RechargeHistoryInterface $rechargeHistoryRepository,
        private TransactionInterface $transactionRepository,
        private TopRechargeInterface $topRechargeRepository,
        private PluginInterface $pluginRepository
    ) {
    }

    public function webhook_NapCardVN(Request $request)
    {

        $code = ($request->cardcode);
        $serial = ($request->serial);
        $price = (int)$request->amount;
        $content = (int)$request->trans;
        $status = $request->status;

        if (!isset($status)) {
            return BaseResponse::msg("Data recharge webhook wrong", 403);
        }

        try {
            $rechargeHistory = $this->rechargeHistoryRepository->getByCondition([
                ['key' => 'serial', 'value' => $serial],
                ['key' => 'code', 'value' => $code],
            ], [
                ['task_number', $content],
                ['status', 'PENDING'],
            ]);

            if (!$rechargeHistory) {
                throw new Exception("Recharge Card not found");
            }
        } catch (\Exception $e) {
            logReport("recharge_webhook", "Có dữ liệu lỗi của webhook | Data: " . json_encode($request->all()), $e);
            return BaseResponse::msg("Không tìm thấy thẻ", 403);
        }

        # ERROR
        if ($status != "thanhcong") {
            # change status recharge history
            $this->rechargeHistoryRepository->changeStatus($rechargeHistory, 'ERROR');
            return BaseResponse::msg("Thẻ thất bại", 200);
        }

        # SUCCESS

        # get percent(%) recharge for user
        try {
            $percentRecharge = $rechargeHistory->shop->shopDetail->percent_recharge;
        } catch (\Exception $e) {
            logReport("recharge_webhook", "Not found percent recharge shop | ID HTR: {$rechargeHistory->id}");
            return BaseResponse::msg("Not found percent recharge shop", 403);
        }

        DB::beginTransaction();
        try {
            # change status recharge history
            $this->rechargeHistoryRepository->changeStatus($rechargeHistory, 'SUCCESS');

            # create transaction
            $this->transactionRepository->createPrice(
                user: $rechargeHistory->user,
                value: $rechargeHistory->price * $percentRecharge / 100,
                note: "Nạp tiền thành công! ID: {$rechargeHistory->id}"
            );

            # create or update Top Recharge
            # Check user exists this month
            $topRechargeExists = $this->topRechargeRepository->exists([
                ['user_id', $rechargeHistory->user_id]
            ], month: date('m'), year: date('Y'));

            $this->topRechargeRepository->updateOrCreate(
                id: $topRechargeExists ? $topRechargeExists->id : null,
                price: $rechargeHistory->price,
                user: $rechargeHistory->user,
                shop: $rechargeHistory->shop,
            );
            DB::commit();
            return BaseResponse::msg("Thẻ thành công, 1", 200);
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("recharge_webhook", "Error save transaction and top recharge | ID HTR: {$rechargeHistory->id}");
            return BaseResponse::msg("Error save transaction and top recharge", 500);
        }
    }

    public function webhook(Request $request)
    {

        $code = ($request->pin);
        $serial = ($request->serial);
        $price = (int)$request->amount;
        $content = (int)$request->content;
        $status = $request->status;

        if (!isset($status)) {
            return BaseResponse::msg("Data recharge webhook wrong", 403);
        }

        try {
            $rechargeHistory = $this->rechargeHistoryRepository->getByCondition([
                ['key' => 'serial', 'value' => $serial],
                ['key' => 'code', 'value' => $code],
            ], [
                ['task_number', $content],
                ['status', 'PENDING'],
            ]);

            if (!$rechargeHistory) {
                throw new Exception("Recharge Card not found");
            }
        } catch (\Exception $e) {
            logReport("recharge_webhook", "Có dữ liệu lỗi của webhook | Data: " . json_encode($request->all()), $e);
            return BaseResponse::msg("Không tìm thấy thẻ", 403);
        }

        # ERROR
        if ($status != "thanhcong") {
            # change status recharge history
            $this->rechargeHistoryRepository->changeStatus($rechargeHistory, 'ERROR');
            return BaseResponse::msg("Thẻ thất bại", 200);
        }

        # SUCCESS

        # get percent(%) recharge for user
        try {
            $percentRecharge = $rechargeHistory->shop->shopDetail->percent_recharge;
        } catch (\Exception $e) {
            logReport("recharge_webhook", "Not found percent recharge shop | ID HTR: {$rechargeHistory->id}");
            return BaseResponse::msg("Not found percent recharge shop", 403);
        }

        DB::beginTransaction();
        try {
            # change status recharge history
            $this->rechargeHistoryRepository->changeStatus($rechargeHistory, 'SUCCESS');

            # create transaction
            $this->transactionRepository->createPrice(
                user: $rechargeHistory->user,
                value: $rechargeHistory->price * $percentRecharge / 100,
                note: "Nạp tiền thành công! ID: {$rechargeHistory->id}"
            );

            # extra price with promotion
            $extraRecharge = $this->pluginRepository->getByKey("extra_recharge");
            $priceExtra =  (int)($extraRecharge["price" . ($rechargeHistory->price / 1000)] ?? 0);
            if ($priceExtra > 0) {
                # create transaction
                $this->transactionRepository->createPrice(
                    user: $rechargeHistory->user,
                    value: $priceExtra,
                    note: "Extra price! ID: {$rechargeHistory->id}"
                );
            }

            # create or update Top Recharge
            # Check user exists this month
            $topRechargeExists = $this->topRechargeRepository->exists([
                ['user_id', $rechargeHistory->user_id]
            ], month: date('m'), year: date('Y'));

            $this->topRechargeRepository->updateOrCreate(
                id: $topRechargeExists ? $topRechargeExists->id : null,
                price: $rechargeHistory->price,
                user: $rechargeHistory->user,
                shop: $rechargeHistory->shop,
            );
            DB::commit();
            return BaseResponse::msg("Thẻ thành công, 1", 200);
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("recharge_webhook", "Error save transaction and top recharge | ID HTR: {$rechargeHistory->id}", $e);
            return BaseResponse::msg("Error save transaction and top recharge", 500);
        }
    }
}
