<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class ServicePlayRequest extends BaseRequest
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
    public function rules()
    {
        return [
            'numrolllop' => 'bail|required|numeric|in:1,2,3,4,5',
            'domain' => 'bail|required|string|exists:shop_list,domain',
            'slug' => 'bail|required|alpha_dash|exists:service_details,slug',
        ];
    }

    public function messages()
    {
        return [
            'numrolllop.required' => 'Chưa chọn số lần quay',
            'numrolllop.numeric' => 'Số lần quay không đúng',
            'numrolllop.in' => 'Số lần quay không đúng',
            'domain.*' => 'Dữ liệu không đúng!',
            'slug.*' => 'Dữ liệu không đúng!',
        ];
    }
}
