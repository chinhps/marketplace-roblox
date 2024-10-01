<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\DomainRequest;
use App\Http\Resources\Service\ServiceUnitResource;
use App\Repository\Service\ServiceCounter\ServiceCounterInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;

class UnitController extends Controller
{
    public function __construct(
        private ServiceDetailInterface $serviceDetailRepository,
        private ServiceCounterInterface $serviceCounterRepository
    ) {
    }

    public function UnitView($slug, DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        /**
         * @var \App\Models\ServiceDetail
         */
        $serviceDetail = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$serviceDetail) {
            return BaseResponse::msg("Không tồn tại dịch vụ", 404);
        }
        # check is unit service
        if ($serviceDetail->service->game_list->game_key !== "GAMEPASS_IMAGE") {
            return BaseResponse::msg("Dịch vụ không được dùng tại đây!", 404);
        }
        # Return response
        return ServiceUnitResource::collection($serviceDetail->serviceOdds->serviceGifts);
    }
}
