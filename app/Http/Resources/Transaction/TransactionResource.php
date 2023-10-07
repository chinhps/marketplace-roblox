<?php

namespace App\Http\Resources\Transaction;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class TransactionResource extends BaseResource
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
            "user_id" => $this->user_id,
            "value" =>  $this->robux ?? $this->diamond ?? $this->price,
            "note" => $this->note,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "user" => $this->user,
        ];
    }
}
