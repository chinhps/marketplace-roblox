<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceDetailResource extends JsonResource
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
            "game_key" => $this->service->game_list->game_key,
            "service_image" => [
                "name" => $this->serviceImage->name,
                "images" => json_decode($this->serviceImage->images, true)
            ],
            "notification" => $this->service->notification,
            "price" => $this->service->price,
            "sale" => $this->service->sale,
            "gifts" => $this->serviceOdds->serviceGifts->pluck('image') ?? [],
            "parcels" => $this->service->game_list->game_key === "GAMEPASS" ?
                $this->serviceOdds->serviceGifts->map(function ($item) {
                    $cash = number_format($item->value1);
                    return [
                        "id" => $item->id,
                        "text" => "Thành tiền: {$cash}đ | {$item->text_custom}"
                    ];
                }) : []
        ];
    }
}
