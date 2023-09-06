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

    public function list()
    {
        return ServiceHistoryListResource::collection($this->serviceHistoryRepository->list(15));
    }
}
