<?php

namespace App\Http\Resources\TopRecharge;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class TopRechargeListResource extends BaseResource
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
            "shop_id" => $this->shop_id,
            "user_id" => $this->user_id,
            "price" => $this->price,
            "name_virtual" => $this->name ?? null,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "user" => $this->user,
            "shop" => $this->shop
        ];
    }
}
