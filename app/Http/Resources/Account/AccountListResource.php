<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class AccountListResource extends BaseResource
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
            "prioritize" => $this->prioritize,
            "admin_id" => $this->admin_id,
            "service_id" => $this->service_id,
            "detail_public" => json_decode($this->detail_public, true),
            "detail_private" => json_decode($this->detail_private, true),
            "price" => $this->price,
            "thumb" => $this->thumb,
            "images" => json_decode($this->images, true),
            "active" => $this->active,
            "status" => $this->status,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "note" => $this->note,
            "service" => $this->service,
            "admin" => $this->admin
        ];
    }
}
