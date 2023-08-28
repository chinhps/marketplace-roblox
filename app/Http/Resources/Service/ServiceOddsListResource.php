<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceOddsListResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
