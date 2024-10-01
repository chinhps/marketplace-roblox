<?php

namespace App\Http\Resources\Shop;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ShopAllResource extends BaseResource
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
            "created_at" => $this->created_at,
        ];
    }
}
