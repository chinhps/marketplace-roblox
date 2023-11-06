<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PurchaseHistoryListResource extends BaseResource
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
            "user_id" => $this->id,
            "admin_id" => $this->admin_id,
            "account_id" => $this->account_id,
            "shop_id" => $this->shop_id,
            "refund" => $this->refund,
            "price" => $this->price,
            "created_at" => $this->created_at,
            "detail_public" => json_decode($this->detail_public, true),
            "detail_private" => (Gate::allows('koc', Auth::user())) ? [] : json_decode($this->detail_private, true),
            "admin" => $this->admin,
            "shop" => $this->shop,
            "user" => $this->user
        ];
    }
}
