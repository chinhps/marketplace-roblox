<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicePlayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "roll_name" => $this['price'] > 0 ? "Chơi thật" : "Chơi thử",
            "price" => $this['price'],
            "gifts" => $this['gifts'],
            "total" => collect($this['giftTotal'])->map(function ($giftTotal) {
                return [
                    "type" => $giftTotal['type'],
                    "type_name" => $giftTotal['type_name'],
                    "value" => $giftTotal['value'],
                ];
            })->values()
        ];
    }
}
