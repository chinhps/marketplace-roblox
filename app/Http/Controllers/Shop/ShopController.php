<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\ShopCreateRequest;
use App\Http\Resources\Shop\ShopListResource;
use App\Repository\Shop\ShopInterface;
use Illuminate\Http\Request;

class ShopController extends Controller
{

    public function __construct(
        private ShopInterface $shopRepository
    ) {
    }

    public function list()
    {
        return ShopListResource::collection($this->shopRepository->list());
    }

    public function getId($id)
    {
        return new ShopListResource($this->shopRepository->get($id));
    }

    public function upsert(ShopCreateRequest $request)
    {
        $validated = $request->validated();

        # UPLOAD IMAGE

        return $this->shopRepository->updateOrInsert($validated['id'], [
            "stt" => 1,
            "domain" => $validated['domain'],
            "shop" => $validated['domain']
        ], [
            "shop_title" => $validated['shop_title'],
            "cash_new_user" => $validated['cash_new_user'],
            "information" => json_encode([
                "keyword" => $validated['keyword'],
                "logo_url" => "abc",
                "favicon_url" => "adsd",
                "background_url" => "dfgdfg",
            ])
        ]);
    }
}
