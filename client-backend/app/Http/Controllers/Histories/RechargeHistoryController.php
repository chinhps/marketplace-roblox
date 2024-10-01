<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
use App\Http\Resources\Histories\RechargeHistoryResource;
use App\Repository\History\RechargeHistory\RechargeHistoryInterface;

class RechargeHistoryController extends Controller
{
    public function __construct(
        private RechargeHistoryInterface $rechargeHistoryRepository
    ) {
    }
    public function list()
    {
        return RechargeHistoryResource::collection($this->rechargeHistoryRepository->list());
    }
}
