<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceListResource extends BaseResource
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
            "price" => $this->price,
            "sale" => $this->sale,
            "notification" => $this->notification,
            "service_key" => $this->service_key,
            "information" => json_decode($this->information, true),
            "note" => $this->note,
            "active" => $this->active,
            "created_at" => $this->created_at,
            "private_form" => json_decode($this->private_form, true),
            "public_form" => json_decode($this->public_form, true),
            "service_details_count" => $this->service_details_count,
            "currency" => $this->currency,
            "service_couter" => $this->serviceCouter,
        ];
    }
}
