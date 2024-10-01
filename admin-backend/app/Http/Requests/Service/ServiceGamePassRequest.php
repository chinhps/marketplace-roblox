<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;
use App\Rules\UrlOrFileImage;

class ServiceGamePassRequest extends BaseRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "id" => "nullable|exists:services,id",
            "idServiceDetail" => "nullable|exists:service_details,id",
            "idGroup" => "required|exists:service_groups,id",
            "idOdds" => "nullable|exists:service_odds,id",
            "dataDomainExcept.*" => "required|string",
            "name_gamepass" => "required|string",
            "prioritize" => 'numeric',
            "unit_type" => 'required|string',
            "gamepass_image" => "required|string|in:YES,NO",
            "except" => "required",
            "active" => "required|in:ON,OFF",
            "parcels" => "required",
            "exemple" => "required|string",
            "image.*" => ["required", new UrlOrFileImage],
        ];
    }
}
