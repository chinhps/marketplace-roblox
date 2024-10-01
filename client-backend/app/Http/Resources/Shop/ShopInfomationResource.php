<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopInfomationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "title_website" => $this->shop_title,
            "percent_recharge" => $this->percent_recharge,
            "information" => [
                "banner_url" => json_decode($this->information, true)['banner_url'] ?? "",
                "keyword" => json_decode($this->information, true)['keyword'] ?? "",
                "logo_url" => json_decode($this->information, true)['logo_url'] ?? "",
                "background_url" => json_decode($this->information, true)['background_url'] ?? "",
                "favicon_url" => json_decode($this->information, true)['favicon_url'] ?? ""
            ]
        ];
    }
}
