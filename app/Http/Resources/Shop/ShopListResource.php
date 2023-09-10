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
        return [
            "id" => $this->id,
            "stt" => $this->stt,
            "domain" => $this->domain,
            "shop" => $this->shop,
            "created_at" =>  $this->created_at,
            "shop_detail" => [
                "id" => $this->shopDetail->id,
                "shop_title" => $this->shopDetail->shop_title,
                "cash_new_user" => $this->shopDetail->cash_new_user,
                "information" => json_decode($this->shopDetail->information),
            ]
        ];
    }
}
