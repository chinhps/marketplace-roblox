<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceGroupListResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return self::convert($this);
    }

    public static function convert($data): array
    {
        return [
            "id" => $data->id,
            "prioritize" => $data->prioritize,
            "name" => $data->name,
            "active" => $data->active,
            "image" => $data->image,
            "created_at" => $data->created_at,
        ];
    }
}
