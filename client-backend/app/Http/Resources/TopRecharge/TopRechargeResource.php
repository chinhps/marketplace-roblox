<?php

namespace App\Http\Resources\TopRecharge;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopRechargeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "name" => $this->name ?? $this->user->name,
            "price" => $this->price
        ];
    }
}
