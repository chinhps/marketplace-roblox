<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
use App\Http\Resources\Histories\ServiceHistoryResource;
use App\Repository\History\ServiceHistory\ServiceHistoryInterface;

class ServiceHistoryController extends Controller
{
    public function __construct(
        private ServiceHistoryInterface $serviceHistoryRepository
    ) {
    }
    public function list()
    {
        return ServiceHistoryResource::collection($this->serviceHistoryRepository->list());
    }
}
