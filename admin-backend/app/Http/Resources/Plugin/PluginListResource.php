<?php

namespace App\Http\Resources\Plugin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class PluginListResource extends BaseResource
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
            "status" => $this->status,
            "excluding" => $this->excluding,
            "form_public" => json_decode($this->form_public, true),
            "created_at" => $this->created_at,
            "plugin_key" => $this->plugin_key,
            "data_public" => json_decode($this->data_public, true),
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
