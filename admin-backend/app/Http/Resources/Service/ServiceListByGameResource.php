<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceListByGameResource extends JsonResource
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
            "game_id" => $this->game_id,
            "service_key" => $this->service_key,
            "price" => $this->price,
            "note" => $this->note,
            "active" => $this->active,
            "parent_id" => $this->parent_id,
            "currency_name" => $this->currency->currency_name ?? "Không xác định",
            "private_form" => json_decode($this->private_form, true) ?? [],
            "public_form" => json_decode($this->public_form, true) ?? [],
        ];
    }
}
