<?php

namespace App\Http\Controllers\TopRecharge;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\TopRecharge\TopRechargeListResource;
use App\Repository\TopRecharge\TopRechargeInterface;
use Illuminate\Http\Request;

class TopRechargeController extends Controller
{
    public function __construct(
        private TopRechargeInterface $topRechargeRepository
    ) {
    }

    public function list()
    {
        return TopRechargeListResource::collection($this->topRechargeRepository->list(15));
    }

    public function delete($id)
    {
        try {
            $this->topRechargeRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }
}
