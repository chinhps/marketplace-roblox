<?php

namespace App\Http\Resources\Shop;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ShopListResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return self::convert($this);
    }

    public static function convert($data): array
    {
        return [
            "id" => $data->id,
            "stt" => $data->stt,
            "domain" => $data->domain,
            "shop" => $data->shop,
            "created_at" => $data->created_at,
            "shop_detail" => $data->shopDetail ? [
                "id" => $data->shopDetail->id,
                "shop_title" => $data->shopDetail->shop_title,
                "cash_new_user" => $data->shopDetail->cash_new_user,
                "percent_recharge" => $data->shopDetail->percent_recharge,
                "information" => json_decode($data->shopDetail->information),
            ] : null
        ];
    }
}
