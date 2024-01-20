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
        return self::convert($this);
    }

    public static function convert($data): array
    {
        return [
            "id" => $data->id,
            "odds_admin_type" => $data->odds_admin_type,
            "odds_admin" => $data->odds_admin,
            "odds_user_type" => $data->odds_user_type,
            "odds_user" => $data->odds_user,
            "created_at" => $data->created_at,
            "countUse" => $data->service_details_count ?? null,
            "note" => $data->note
        ];
    }
}
