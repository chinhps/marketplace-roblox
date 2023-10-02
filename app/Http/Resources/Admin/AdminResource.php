<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends BaseResource
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
            "admin_type" => $this->admin_type,
            "name" => $this->name,
            "username" => $this->username,
            "block" => $this->block,
            "active" => $this->active,
            "created_at" => $this->created_at,
            "user_id" => $this->user_id,
            "purchase_histories_sum_price" => $this->purchase_histories_sum_price,
            "accounts_count" => $this->accounts_count,
            "shop" => $this->shop ? [
                "id" =>  $this->shop->id,
                "domain" =>  $this->shop->domain,
            ] : null,
            "user" => $this->user ? [
                "id" =>  $this->user->id,
                "provider_id" =>  $this->user->provider_id,
            ] : null,
        ];
    }
}
