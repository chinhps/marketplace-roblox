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
        return [
            "id" => $this->id,
            "name" => $this->name,
            "image" => $this->image,
            "active" => $this->active,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "form_public" => json_decode($this->form_public, true),
            "data_public" => json_decode($this->data_public, true)
        ];
    }
}
