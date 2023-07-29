<?php

namespace App\Http\Controllers\TopRecharge;

use App\Http\Controllers\Controller;
use App\Http\Requests\DomainRequest;
use App\Http\Resources\TopRecharge\TopRechargeResource;
use App\Repository\TopRecharge\TopRechargeInterface;
use Illuminate\Http\Request;

class TopRechargeController extends Controller
{
    public function __construct(
        private TopRechargeInterface $topRechargeRepository
    ) {
    }

    public function getTopRechargeList(DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];

        $month = date('m');
        $year =  date('Y');

        $dataTop = collect([
            ...$this->topRechargeRepository->topRecharges($domain, $month, $year),
            ...$this->topRechargeRepository->topVirtualRecharges($domain, $month, $year)
        ])->sortByDesc('price')->take(5);

        return TopRechargeResource::collection($dataTop);
    }

    public function topRechargeInformation()
    {
    }
}
