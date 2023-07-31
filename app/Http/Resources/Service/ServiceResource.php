<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->serviceImage->name,
            "price" => $this->service->price,
            "thumb" => $this->serviceImage->thumb,
            "gameType" => $this->service->game_list->game_key,
            "counter" => $this->serviceCouter->value ?? 0,
            "slug" => $this->slug ?? 0,
            "counterText" => "AUTO"
        ];
    }
}
