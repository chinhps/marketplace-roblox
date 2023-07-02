<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Http\Resources\Service\ServiceDetailResource;
use App\Http\Resources\Service\ServiceListResource;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceGroupInterface $serviceGroupRepository,
        private ServiceDetailInterface $serviceDetailRepository,
    ) {
    }

    # Danh sách dịch vụ ở trang chủ
    public function serviceList(Request $request)
    {
        $domain = $request->domain;
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        return ServiceListResource::collection($this->serviceGroupRepository->serviceGroupList($idListAllow));
    }

    # Chi tiết dịch vụ
    public function serviceDetail($slug, Request $request)
    {
        $domain = $request->domain;
        # Kiểm tra service đó có tồn tại trong shop đang được gửi lên hay không
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $service = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        # Trả về kết quả
        return new ServiceDetailResource($service);
    }

    # Xử lý hành động quay(real)
    public function handelPlay()
    {
        return 123;
    }

    public function handelPlayTry()
    {
        return 123;
    }
}
