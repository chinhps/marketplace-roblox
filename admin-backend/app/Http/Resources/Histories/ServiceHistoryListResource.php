<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceHistoryListResource extends BaseResource
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
            "user_id" => $this->user_id,
            "service_id" => $this->service_id,
            "shop_id" => $this->shop_id,
            "quantity" => $this->quantity,
            "price" => $this->price,
            "detail" => json_decode($this->detail, true),
            "created_at" => $this->created_at,
            "service" => [
                "id" => $this->service->id,
                "note" => $this->service->note,
            ],
            "user" => [
                "id" => $this->user->id,
                "shop_id" => $this->user->shop_id,
                "provider_id" => $this->user->provider_id,
                "name" => $this->user->name,
            ],
            "shop" => $this->shop
        ];
    }
}
