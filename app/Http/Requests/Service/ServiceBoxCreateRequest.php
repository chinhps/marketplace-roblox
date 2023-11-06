<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class ServiceBoxCreateRequest extends BaseRequest
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
            "chests" => "array",
            "chests.*.value" => "numeric|min:0",
            "chests.*.countChest" => "numeric|min:0",
            "service_id" => "exists:services,id"
        ];
    }
}
