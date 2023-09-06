<?php

namespace App\Http\Controllers\Transactions;

use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction\TransactionResource;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct(
        private TransactionInterface $transactionRepository
    ) {
    }

    public function priceList()
    {
        return TransactionResource::collection($this->transactionRepository->listPrice(15));
    }

    public function robuxList()
    {
        return TransactionResource::collection($this->transactionRepository->listRobux(15));
    }

    public function diamondList()
    {
        return TransactionResource::collection($this->transactionRepository->listDiamond(15));
    }

    public function createTransaction($id)
    {
        return;
    }
}
