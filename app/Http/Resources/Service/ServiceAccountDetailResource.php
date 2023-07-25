<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceAccountDetailResource extends JsonResource
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
            "service_image" => [
                "name" => $this->serviceImage->name,
                "image" => $this->serviceImage->thumb
            ],
            "notification" => $this->service->notification,
        ];
    }
}
