<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class ServiceFilterRequest extends BaseRequest
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
            'id' => ["nullable", "numeric"],
            'price' => ["nullable", "numeric", "between:1,7"],
            'sort' => ["nullable", "numeric", "between:1,2"],
        ];
    }

    public function messages(): array
    {
        return [
            'id.numeric' => 'ID phải là số',
            'price.*' => 'Dữ liệu lọc giá không đúng',
            'sort.*' => 'Dữ liệu lọc sắp xếp không đúng',
        ];
    }
}
