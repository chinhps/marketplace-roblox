<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RechargeHistoryListResource extends BaseResource
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
            "recharge_id" => $this->recharge_id,
            "detail" => (Gate::allows('koc', Auth::user())) ? [] : json_decode($this->detail, true),
            "refund" => $this->refund,
            "price" => $this->price,
            "task_number" => $this->task_number,
            "status" => $this->status,
            "ip" => $this->ip,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "recharge" => $this->recharge,
            "user" => $this->user,
            "shop" => $this->shop,
        ];
    }
}
