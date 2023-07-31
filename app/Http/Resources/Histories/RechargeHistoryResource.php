<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class RechargeHistoryResource extends BaseResource
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
            "refund" => $this->refund !== 'no',
            "price" => $this->price,
            "status" => $this->status,
            "recharge_type" => $this->recharge->recharge_name,
            "detail" => json_decode($this->detail, true),
            "created_at" => $this->created_at
        ];
    }
}
