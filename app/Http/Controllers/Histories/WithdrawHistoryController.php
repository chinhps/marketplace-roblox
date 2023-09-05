<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Histories\WithdrawUpdateRequest;
use App\Http\Resources\Histories\WithdrawHistoryListResource;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use Illuminate\Http\Request;

class WithdrawHistoryController extends Controller
{
    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository
    ) {
    }

    public function list()
    {
        return WithdrawHistoryListResource::collection($this->withdrawHistoryRepository->list(15));
    }

    public function updateStatus($id, WithdrawUpdateRequest $request)
    {
        $validated = $request->validated();
        $this->withdrawHistoryRepository->update($id, [
            "status" => (string)$validated['status']
        ]);
        return BaseResponse::msg("Thay đổi trạng thái thành công! Status:" . $validated['status']);
    }
}
