<?php

namespace App\Http\Controllers\TopRecharge;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\TopRecharge\TopRechargeListResource;
use App\Repository\TopRecharge\TopRechargeInterface;
use App\Repository\TopRecharge\TopRechargeVirtual\TopRechargeVirtualInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TopRechargeController extends Controller
{
    public function __construct(
        private TopRechargeInterface $topRechargeRepository,
        private TopRechargeVirtualInterface $topRechargeVirtureRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('name');
        $sortPrice = $request->input('sortPrice');
        $time = $request->input('time');

        $timeNow = Carbon::now();
        switch ($time) {
            case "last-month":
                $month = date("m", strtotime("first day of previous month"));
                $year =  $timeNow->year;
                break;
            default:
                $month = date("m");
                $year =  $timeNow->year;
                break;
        }
        if ($domain) {
            $dataTop = collect([
                ...$this->topRechargeRepository->topRecharges($domain, $month, $year),
                ...$this->topRechargeVirtureRepository->topVirtualRecharges($domain, $month, $year)
            ])->sortByDesc('price');
            return TopRechargeListResource::collection($dataTop);
        }

        $filter = [];

        if ($domain) {
            $filter['shop_filter'] = $domain;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($sortPrice) {
            $filter['sort'][] = ['price', $sortPrice == 1 ? 'asc' : 'desc'];
        }

        return TopRechargeListResource::collection($this->topRechargeRepository->list(15, $filter));
    }

    public function delete($id)
    {
        try {
            $this->topRechargeRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }
}
