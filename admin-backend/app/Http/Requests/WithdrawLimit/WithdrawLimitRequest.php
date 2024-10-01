<?php

namespace App\Http\Requests\WithdrawLimit;

use App\Http\Requests\BaseRequest;

class WithdrawLimitRequest extends BaseRequest
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
            "id" => "nullable|exists:withdrawal_limits,id",
            "withdraw_type" => "exists:withdraw_types,id",
            "provider_id" => "exists:users,provider_id",
            "limit" => "required|numeric|min:0",
            "active" => "required|in:ON,OFF",
        ];
    }
}
