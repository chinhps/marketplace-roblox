<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
use App\Http\Resources\Histories\ServiceHistoryListResource;
use App\Repository\Histories\ServiceHistory\ServiceHistoryInterface;
use Illuminate\Http\Request;

class ServiceHistoryController extends Controller
{
    public function __construct(
        private ServiceHistoryInterface $serviceHistoryRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $serviceName = $request->input('service_name');
        $giftName = $request->input('gift_name');
        $userId = $request->input('user_id');

        $filter = [];

        if ($userId) {
            $filter['query'][] = ['user_id', $userId];
        }
        if ($domain) {
            $filter['shop_filter'] = $domain;
        }
        if ($serviceName) {
            $filter['service_filter'] = $serviceName;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($giftName) {
            $filter['query'][] = ['detail', 'like', "%$giftName%"];
        }

        return ServiceHistoryListResource::collection($this->serviceHistoryRepository->list(15, $filter));
    }
}
