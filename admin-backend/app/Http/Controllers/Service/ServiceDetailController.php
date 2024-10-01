<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\Service\ServiceDetailListResource;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use Illuminate\Http\Request;

class ServiceDetailController extends Controller
{

    public function __construct(
        private ServiceDetailInterface $serviceDetailRepository,
    ) {
    }

    public function list()
    {
        return ServiceDetailListResource::collection($this->serviceDetailRepository->list(15));
    }

    public function delete($id)
    {
        try {
            $this->serviceDetailRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }
}
