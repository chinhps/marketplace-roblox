<?php

namespace App\Http\Resources\Histories;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceHistoryResource extends BaseResource
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
            "quantity" => $this->quantity,
            "service_name" => $this->service->note,
            "price" => $this->service->price,
            "default" => json_decode($this->detail, true)['default'] ?? "Không xác định",
            "detail" => collect(json_decode($this->detail, true)['details'])->map(function ($vl) {
                return [
                    "name" => $vl['msg'] ?? ""
                ];
            }),
            "created_at" => $this->created_at
        ];
    }
}
