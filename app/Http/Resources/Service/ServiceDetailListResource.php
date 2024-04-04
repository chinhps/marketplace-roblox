<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class ServiceDetailListResource extends BaseResource
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
            "service_group_id" =>  $this->service_group_id,
            "service_id" =>  $this->service_id,
            "service_odds_id" =>  $this->service_odds_id,
            "service_image_id" => $this->service_image_id,
            "prioritize" =>  $this->prioritize,
            "excluding" => $this->excluding,
            "created_at" => $this->created_at,
            "slug" => $this->slug,
            "service_image" => $this->serviceImage ? [
                "id" => $this->serviceImage->id,
                "thumb" => $this->serviceImage->thumb,
                "images" => json_decode($this->serviceImage->images, true),
                "name" => $this->serviceImage->name,
                "created_at" => $this->serviceImage->created_at,
            ] : null,
            "service_group" => $this->serviceGroup ? ServiceGroupListResource::convert($this->serviceGroup) : null,
            "service_odds" => $this->serviceOdds ? ServiceOddsListResource::convert($this->serviceOdds, false) : null,
            "shop_list" => $this->shop_list->map(function ($shop) {
                return [
                    "id" => $shop->id,
                    "stt" => $shop->stt,
                    "domain" => $shop->domain,
                    "shop" => $shop->shop,
                    "created_at" => $shop->created_at,
                ];
            })
        ];
    }
}
