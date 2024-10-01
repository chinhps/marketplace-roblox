<?php

namespace App\Http\Controllers\Withdraw;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Withdraw\WithdrawDiamondRequest;
use App\Repository\History\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\Withdraw\WithdrawLimit\WithdrawLimitInterface;
use App\Repository\Withdraw\WithdrawType\WithdrawTypeInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WithdrawDiamondController extends Controller
{
    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
        private WithdrawTypeInterface $withdrawTypeRepository,
        private WithdrawLimitInterface $withdrawLimitRepository
    ) {
    }

    public function diamond(WithdrawDiamondRequest $request)
    {
        $validated = $request->validated();
        $diamond = HandleHelperDiamond::getNumberWithdrawDiamond($validated['type_withdraw']);
        $idGame = $validated['id_game'];

        $currentDiamond = $this->transactionRepository->getDiamond(Auth::user());
        if ($currentDiamond <= 0) {
            return BaseResponse::msg("Tài khoản của bạn hết Kim cương!", 403);
        }
        if ($currentDiamond < $diamond) {
            return BaseResponse::msg("Tài khoản của bạn không đủ Kim cương để rút!", 403);
        }

        DB::beginTransaction();

        try {
            $withdrawType = $this->withdrawTypeRepository->getByKey("DIAMOND");
            # Check limit withdraw
            $withdrawalLimit = $this->withdrawLimitRepository->getLimitUser(Auth::user(), $withdrawType);
            if ($withdrawalLimit) {
                $limit = $this->withdrawHistoryRepository->checkLimit(Auth::user(), $withdrawType)
                    + $diamond > $withdrawalLimit->withdraw_limit;
            }
            # check admin & exist limit withdraw -> cancel
            # check exist limit & limited
            $status = statusLimit($withdrawalLimit, isset($limit) && $limit);
            # save to history
            $requestId = rand(100000000, 999999999); # Order ID
            $history = $this->withdrawHistoryRepository->create([
                "task_number" => $requestId,
                "withdraw_type" => "DIAMOND",
                "value" => $diamond,
                "status" => $status,
                "cost" => 0,
                "detail" => json_encode([
                    ["key" => "id_game", "name" => "ID Game", "value" => $idGame],
                ])
            ], user: Auth::user(), shop: Auth::user()->shop, withdrawType: $withdrawType);

            if ($status == "CANCEL") {
                $this->transactionRepository->createDiamond(0, "Rút Kim cương, WITHDRAW LIMIT | ID HTR: {$history->id}");
                DB::commit();
                return BaseResponse::msg("Rút Kim cương thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
            }
            # create minus robux at transaction
            $this->transactionRepository->createDiamond($diamond * -1, "Rút Kim cương, ID HTR: {$history->id}");

            DB::commit();
            return BaseResponse::msg("Rút Kim cương thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
        } catch (\Exception $e) {
            DB::rollBack();
            logReport("withdraw_errors", "Rút kim cương", $e);
            return BaseResponse::msg('Có lỗi xảy ra khi thực hiện rút vui lòng thao tác lại!', 500);
        }
    }
}


class HandleHelperDiamond
{
    public static function getNumberWithdrawDiamond($id)
    {
        $diamond  = 0;
        switch ($id) {
            case 1:
                $diamond = 113;
                break;
            case 2:
                $diamond = 283;
                break;
            case 3:
                $diamond = 566;
                break;
            case 4:
                $diamond = 1132;
                break;
            case 5:
                $diamond = 2830;
                break;
            default:
                break;
        }
        return $diamond;
    }
}
