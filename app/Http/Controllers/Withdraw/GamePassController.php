<?php

namespace App\Http\Controllers\Withdraw;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Withdraw\BuyGamePassRequest;
use App\Repository\History\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\Withdraw\WithdrawLimit\WithdrawLimitInterface;
use App\Repository\Withdraw\WithdrawType\WithdrawTypeInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GamePassController extends Controller
{

    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
        private ServiceDetailInterface $serviceDetailRepository,
        private WithdrawTypeInterface $withdrawTypeRepository,
        private WithdrawLimitInterface $withdrawLimitRepository
    ) {
    }

    public function buyGamePass($slug, BuyGamePassRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];

        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        /**
         * @var \App\Models\ServiceDetail
         */
        $serviceDetail = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$serviceDetail) {
            return BaseResponse::msg("Không tồn tại dịch vụ", 404);
        }

        $parcel = $serviceDetail->serviceOdds->serviceGifts()->where('id', $validated['id_parcel'])->first();

        if (!$parcel) {
            return BaseResponse::msg("Không tồn tại gói này!", 404);
        }

        # Check price
        $currentPrice = $this->transactionRepository->getPrice(Auth::user());
        if ($currentPrice <= 0) {
            return BaseResponse::msg("Tài khoản của bạn đã hết tiền!", 403);
        }
        if ($currentPrice < $parcel->value1) {
            return BaseResponse::msg("Tài khoản của bạn không đủ tiền để mua!", 403);
        }

        DB::beginTransaction();

        try {
            $gamepassType = $validated['gamepass_type'];
            $withdrawType = $this->withdrawTypeRepository->getByKey($gamepassType);
            # Check limit withdraw
            $withdrawalLimit = $this->withdrawLimitRepository->getLimitUser(Auth::user(), $withdrawType);
            if ($withdrawalLimit) {
                $limit = $this->withdrawHistoryRepository->checkLimit(Auth::user(), $withdrawType)
                    + $parcel->value1 > $withdrawalLimit->withdraw_limit;
            }
            # check admin & exist limit withdraw -> cancel
            # check exist limit & limited
            $status = statusLimit($withdrawalLimit, isset($limit) && $limit);
            # save to history
            $requestId = rand(1000000000, 9999999999); # Order ID
            $history = $this->withdrawHistoryRepository->create([
                "task_number" => $requestId,
                "withdraw_type" => $gamepassType,
                "value" => $parcel->value1,
                "status" => $status,
                "cost" => $parcel->cost,
                "detail" => json_encode([
                    [
                        "key" => "parcel",
                        "name" => "Tên gói",
                        "value" => $parcel->text_custom
                    ], [
                        "key" => "username",
                        "name" => "Tài khoản",
                        "value" => $validated["username_roblox"]
                    ], [
                        "key" => "password",
                        "name" => "Mật khẩu",
                        "value" => $validated["password_roblox"]
                    ], [
                        "key" => "note",
                        "name" => "Ghi chú",
                        "value" => $validated["note_roblox"] ?? null
                    ]
                ])
            ], user: Auth::user(), shop: Auth::user()->shop, withdrawType: $withdrawType);

            if ($status == "CANCEL") {
                $this->transactionRepository->createPrice(
                    0,
                    "Mua {$gamepassType}, WITHDRAW LIMIT | ID {$gamepassType}: {$parcel->id}, ID HTR: {$history->id}"
                );
                DB::commit();
                return BaseResponse::msg("Mua thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
            }
            # create minus price at transaction
            $this->transactionRepository->createPrice(
                $parcel->value1 * -1,
                "Mua {$gamepassType}, ID {$gamepassType}: {$parcel->id}, ID HTR: {$history->id}"
            );

            DB::commit();
            return BaseResponse::msg("Mua thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("withdraw_errors", "Mua Gamepass", $e);
            return BaseResponse::msg('Có lỗi xảy ra khi thực hiện rút vui lòng thao tác lại!', 500);
        }
    }
}
