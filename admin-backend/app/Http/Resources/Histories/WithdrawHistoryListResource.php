<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class WithdrawHistoryListResource extends BaseResource
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
            "shop_id" => $this->shop_id,
            "task_number" => $this->task_number,
            "withdraw_type" => $this->withdraw_type,
            "value" => $this->value,
            "cost" => $this->cost,
            "cost_type" => $this->cost_type,
            "status" => $this->status,
            "detail" => json_decode($this->detail, true),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "user" => $this->user,
            "shop" => $this->shop
        ];
    }
}
