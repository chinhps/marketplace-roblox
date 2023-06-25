<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
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
    public function serviceList()
    {
        $domain = "veum.org";
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        return ServiceListResource::collection($this->serviceGroupRepository->serviceGroupList($idListAllow));
    }
}
