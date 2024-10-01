<?php

namespace App\Http\Requests\TopRecharge;

use App\Http\Requests\BaseRequest;

class TopRechargeVirtualCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:top_recharge_virtual,id",
            "shop_id" => "required|exists:shop_list,id",
            "name" => "required|string",
            "price" => "required|numeric|min:0",
        ];
    }
}
