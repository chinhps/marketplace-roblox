<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceUnitResource extends BaseResource
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
            "image" => $this->image,
            "name" => $this->text_custom,
            "price" => $this->value1
        ];
    }
}
