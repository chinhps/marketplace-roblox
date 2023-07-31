<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class PurchaseHistoryResource extends BaseResource
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
            "account_id" => $this->account_id,
            "price" => $this->price,
            "refund" => $this->refund !== "NO",
            "created_at" => $this->created_at,
            "service_name" => $this->account->service->note,
            "detail" => collect(json_decode($this->detail_private, true))->map(function ($vl) {
                return [
                    "name" => $vl['name'],
                    "value" => $vl['value']
                ];
            }),
        ];
    }
}
