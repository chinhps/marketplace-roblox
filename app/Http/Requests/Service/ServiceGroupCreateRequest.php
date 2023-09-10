<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;
use App\Rules\UrlOrFileImage;

class ServiceGroupCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:service_groups,id",
            "prioritize" => "required|numeric",
            "name" => "required|string",
            "active" => "required|in:ON,OFF",
            "image.*" => ["required", new UrlOrFileImage],
        ];
    }
}
