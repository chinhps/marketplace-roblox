<?php

namespace App\Http\Requests\Withdraw;

use App\Http\Requests\BaseRequest;

class BuyGamePassRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge($this->domainRules()['rules'], [
            "id_parcel" => "required|exists:service_gifts,id",
            "username_roblox" => "required|string",
            "password_roblox" => "required|string",
            "note_roblox" => "string",
        ]);
    }
}
