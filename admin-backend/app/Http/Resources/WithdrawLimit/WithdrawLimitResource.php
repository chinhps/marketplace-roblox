<?php

namespace App\Http\Resources\WithdrawLimit;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class WithdrawLimitResource extends BaseResource
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
            "withdraw_type_id" => $this->withdraw_type_id,
            "withdraw_limit" => $this->withdraw_limit,
            "active" => $this->active,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "user" => $this->user,
            "withdraw_type" => $this->withdrawType,
            "user_withdraw_sum_value" => $this->user_withdraw_sum_value ?? 0
        ];
    }
}
