<?php

namespace App\Http\Requests\Withdraw;

use App\Http\Requests\BaseRequest;

class StatusUpdateWithdrawPartnerRequest extends BaseRequest
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
            "id" => "exists:withdrawals_partner,id",
            "status" => "in:SUCCESS,CANCEL"
        ];
    }
}
