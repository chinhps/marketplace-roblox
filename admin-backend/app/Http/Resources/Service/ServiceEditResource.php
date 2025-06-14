<?php

namespace App\Http\Resources\Service;

use App\Models\GameList;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            "information" => json_decode($this->information, true),
            "service_detail" => $this->serviceDetails->first(),
            "private_form" => json_decode($this->private_form, true),
            "public_form" => json_decode($this->public_form, true),
            "is_form" => in_array($this->game_id, GameList::ISFORM)
        ];
    }
}
