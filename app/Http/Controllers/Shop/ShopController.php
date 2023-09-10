<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\BaseResponse;
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

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $price = $request->input('price');
        $sort = $request->input('sort');

        $filter = [];

        if ($domain) {
            $filter['query'][] = ['domain', 'like', "%$domain%"];
        }
        if ($price) {
            $filter['sort'][] = ['id', $price == 1 ? 'asc' : 'desc'];
        }
        if ($sort) {
            $filter['sort'][] = ['stt', $sort == 1 ? 'asc' : 'desc'];
        }

        return ShopListResource::collection($this->shopRepository->list(10, $filter));
    }

    public function getId($id)
    {
        return new ShopListResource($this->shopRepository->get($id));
    }

    public function upsert(ShopCreateRequest $request)
    {
        $validated = $request->validated();
        # UPLOAD IMAGE
        $logoUrl = uploadImageQueue($validated['logo_url'][0]);
        $faviconUrl = uploadImageQueue($validated['favicon_url'][0]);
        $backgroundUrl = uploadImageQueue($validated['background_url'][0]);

        $this->shopRepository->updateOrInsert($validated['id'], [
            "stt" => 1,
            "domain" => $validated['domain'],
            "shop" => $validated['domain']
        ], [
            "shop_title" => $validated['shop_title'],
            "cash_new_user" => $validated['cash_new_user'],
            "information" => json_encode([
                "keyword" => $validated['keyword'],
                "logo_url" => $logoUrl,
                "favicon_url" => $faviconUrl,
                "background_url" => $backgroundUrl,
            ])
        ]);
        $msg = "Đã tạo thành công";
        if ($validated['id']) {
            $msg = "Cập nhật thành công!";
        }
        return BaseResponse::msg("$msg! Domain: {$validated['domain']}");
    }
}
