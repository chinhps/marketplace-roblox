<?php

namespace App\Http\Requests;

use App\Rules\Domain;

class DomainRequest extends BaseRequest
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
            "domain" => ["bail", "required", "string", "exists:shop_list,domain", new Domain],
        ];
    }

    public function messages(): array
    {
        return [
            'domain.*' => 'Dữ liệu gửi lên đang gặp vấn đề! Liên hệ admin',
        ];
    }
}
