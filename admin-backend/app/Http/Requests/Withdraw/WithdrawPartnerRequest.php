<?php

namespace App\Http\Requests\Withdraw;

use App\Http\Requests\BaseRequest;

class WithdrawPartnerRequest extends BaseRequest
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
        return [
            "amount" => "required|numeric|min:100000",
            "note" => "required"
        ];
    }
}
