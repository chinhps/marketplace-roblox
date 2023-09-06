<?php

namespace App\Http\Controllers\TopRecharge;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\TopRecharge\TopRechargeVirtualCreateRequest;
use App\Http\Resources\TopRecharge\TopRechargeVirtualListResource;
use App\Repository\Shop\ShopInterface;
use App\Repository\TopRecharge\TopRechargeVirtual\TopRechargeVirtualInterface;
use Illuminate\Http\Request;

class TopRechargeVirtualController extends Controller
{
    public function __construct(
        private TopRechargeVirtualInterface $topRechargeVirtualRepository,
        private ShopInterface $shopRepository,
    ) {
    }

    public function list()
    {
        return TopRechargeVirtualListResource::collection($this->topRechargeVirtualRepository->list(15));
    }

    public function getId($id)
    {
        return new TopRechargeVirtualListResource($this->topRechargeVirtualRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->topRechargeVirtualRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(TopRechargeVirtualCreateRequest $request)
    {
        $validated = $request->validated();
        $data = $this->topRechargeVirtualRepository->updateOrInsert($validated['id'], [
            "name" => $validated['name'],
            "price" => $validated['price'],
        ], shop: $this->shopRepository->get($validated['shop_id']));
        return $data;
    }
}
