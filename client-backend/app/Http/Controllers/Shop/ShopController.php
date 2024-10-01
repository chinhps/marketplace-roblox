<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\DomainRequest;
use App\Http\Resources\Shop\ShopInfomationResource;
use App\Repository\Shop\ShopInterface;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function __construct(private ShopInterface $shopRepository)
    {
    }
    public function infomationShop(DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        return new ShopInfomationResource($this->shopRepository->getInfomation($domain));
    }
}
