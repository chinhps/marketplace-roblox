<?php

namespace App\Http\Resources\Event;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class EventListResource extends BaseResource
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
