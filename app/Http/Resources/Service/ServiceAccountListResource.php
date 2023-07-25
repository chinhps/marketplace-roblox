<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceAccountListResource extends BaseResource
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
            "detail" => json_decode($this->detail_public, true),
            "price" => $this->price,
            "thumb" => $this->thumb,
            "note" => $this->note,
            "sale" => 50,
            "images" => json_decode($this->images, true)
        ];
    }
}
