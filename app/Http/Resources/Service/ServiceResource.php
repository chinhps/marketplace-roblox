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
            "counter" => $this->service->game_list->game_key == "ACCOUNT" || $this->service->game_list->game_key == "RANDOM" ?
                $this->service->accounts_count  :
                $this->serviceCounter->value ?? 0,
            "slug" => $this->slug ?? 0,
            "counterText" => "AUTO",
            "more" => json_decode($this->service->information, true),
            "notification" => $this->service->game_list->is_game ? null : $this->service->notification
        ];
    }
}
