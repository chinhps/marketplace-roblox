<?php

namespace App\Http\Controllers\Histories;

use App\Http\Controllers\Controller;
use App\Http\Resources\Histories\EventHistoryListResource;
use App\Repository\Histories\EventHistory\EventHistoryInterface;

class EventHistoryController extends Controller
{
    public function __construct(
        private EventHistoryInterface $eventHistoryRepository
    ) {
    }

    public function list()
    {
        return EventHistoryListResource::collection($this->eventHistoryRepository->list(15));
    }
}
