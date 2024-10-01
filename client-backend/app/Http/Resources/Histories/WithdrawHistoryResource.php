<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class WithdrawHistoryResource extends BaseResource
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
            "withdraw_type" => $this->withdraw_type,
            "value" => $this->value,
            "status" => $this->status,
            "detail" => collect(json_decode($this->detail, true))->map(function ($vl) {
                return [
                    "name" => $vl['name'],
                    "value" => $vl['value']
                ];
            }),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }
}
