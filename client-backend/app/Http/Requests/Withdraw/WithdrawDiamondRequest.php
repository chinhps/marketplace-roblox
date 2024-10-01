<?php

namespace App\Http\Requests\Withdraw;

use App\Http\Requests\BaseRequest;

class WithdrawDiamondRequest extends BaseRequest
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
            "type_withdraw" => "required|in:1,2,3,4,5",
            "id_game" => "required|numeric"
        ];
    }
}
