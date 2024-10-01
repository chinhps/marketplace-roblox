<?php

namespace App\Http\Controllers\TopRecharge;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopRecharge\TopRechargeRequest;
use App\Http\Resources\TopRecharge\TopRechargeResource;
use App\Repository\TopRecharge\TopRechargeInterface;
use Carbon\Carbon;

class TopRechargeController extends Controller
{
    public function __construct(
        private TopRechargeInterface $topRechargeRepository
    ) {
    }

    public function getTopRechargeList(TopRechargeRequest $request)
    {

        $timeObj = (new \DateTime(date('Y-m-d')))->modify('-1 month');

        $validated = $request->validated();
        $domain = $validated['domain'];

        $timeNow = Carbon::now();
        switch ($validated['time']) {
            case "present":
                $month = date("m");
                $year =  $timeNow->year;
                break;
            case "last-month":
                $month = $timeObj->format('m');
                $year = $timeObj->format('Y');
                break;
        }
        $dataTop = collect([
            ...$this->topRechargeRepository->topRecharges($domain, $month, $year),
            ...$this->topRechargeRepository->topVirtualRecharges($domain, $month, $year)
        ])->sortByDesc('price')->take(5);

        return TopRechargeResource::collection($dataTop);
    }
}
