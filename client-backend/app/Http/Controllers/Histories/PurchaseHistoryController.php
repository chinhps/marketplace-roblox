<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
use App\Http\Resources\Histories\PurchaseHistoryResource;
use App\Repository\History\PurchaseHistory\PurchaseHistoryInterface;

class PurchaseHistoryController extends Controller
{
    public function __construct(
        private PurchaseHistoryInterface $purchaseHistoryRepository
    ) {
    }
    public function list()
    {
        return PurchaseHistoryResource::collection($this->purchaseHistoryRepository->list());
    }
}
