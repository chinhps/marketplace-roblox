<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class AccountListResource extends BaseResource
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
