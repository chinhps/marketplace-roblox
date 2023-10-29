<?php

namespace App\Http\Controllers\WithdrawLimit;

use App\Http\Controllers\Controller;
use App\Http\Resources\WithdrawLimit\WithdrawTypeAllResource;
use App\Repository\WithdrawType\WithdrawTypeInterface;
use Illuminate\Http\Request;

class WithdrawTypeController extends Controller
{
    public function __construct(
        private WithdrawTypeInterface $withdrawTypeRepository
    ) {
    }

    public function all()
    {
        return WithdrawTypeAllResource::collection($this->withdrawTypeRepository->all());
    }
}
