<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Http\Resources\Service\ServiceDetailResource;
use App\Http\Resources\Service\ServiceListResource;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceGroupInterface $serviceGroupRepository,
        private ServiceInterface $serviceRepository,
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

    /********
     * FLOW *
     * Get Slug at Url
     * Payload POST: "numrolllop","slug","domain"
     * 
     * Check Slug url === Slug payload(decode)
     * Check service at `Domain`
     * Get data `service`
     * Check `type service`: "WHEEL" | "LUCKYCARD" | "LUCKYBOX" -> Exception return false
     * Get odds service
     * 
     * - START TRANSACTION
     * 
     * Get price service * numloop = PRICE_SERVICE
     * Check free turn
     * Get turn by "price" current user
     * Minus price of current user
     * 
     * -*Priority loop free turn
     * Check Provider User with Provider Admin -> `USER PR`
     * 
     * + `USER PR` Unlimit Odds
     * + `USER DEFAULT` Select gift not vip
     * 
     * - END TRANSACTION
     * 
     ********/

    # Xử lý hành động quay(real)
    public function handelPlay(string $slug, Request $request)
    {
        $domain = $request->domain;
        $numrolllop = $request->numrolllop;

        # Check Slug url === Slug payload(decode)
        if ($slug !== $request->slug) return false;
        # Check service at `Domain`
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        # Get odds service
        $service = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$service) return false;

        # Check `type service`: "WHEEL" | "LUCKYCARD" | "LUCKYBOX" -> Exception return false
        if (!$service->service->game_list->is_game) return false;

        # Get price service * numloop = PRICE_SERVICE
        $priceService = $service->service->price * $numrolllop;

        # Check turn
        $checkTurn = false;
        # Check free turn
        $countFreeTurn = $this->serviceRepository->serviceTurn($service->service, Auth::user()) ?? 0;
        if (floor($countFreeTurn / $numrolllop) >= 1) $checkTurn = true;
        # Get turn by "price" current user

        


        return 123;
    }

    public function handelPlayTry()
    {
        return 123;
    }
}
