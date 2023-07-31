<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
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
}
