<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Withdraw\WithdrawBuyRobuxRequest;
use App\Http\Requests\Withdraw\WithdrawDiamondRequest;
use App\Http\Requests\Withdraw\WithdrawRobuxRequest;
use App\Http\Resources\Histories\WithdrawHistoryResource;
use App\Repository\History\WithdrawHistory\WithdrawHistoryInterface;

class WithdrawHistoryController extends Controller
{
    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository
    ) {
    }

    public function list()
    {
        return WithdrawHistoryResource::collection($this->withdrawHistoryRepository->list());
    }

    public function robux(WithdrawRobuxRequest $request)
    {
        return BaseResponse::msg("Rút Robux thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
    }

    public function diamond(WithdrawDiamondRequest $request)
    {
        return BaseResponse::msg("Rút Kim cương thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
    }

    public function buy_robux(WithdrawBuyRobuxRequest $request)
    {
        return BaseResponse::msg("Mua Robux thành công! Bạn có thể kiểm tra tiến độ trong Lịch sử rút/mua");
    }
}
