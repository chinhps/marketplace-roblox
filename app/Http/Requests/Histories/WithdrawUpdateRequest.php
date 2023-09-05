<?php

namespace App\Http\Requests\Histories;

use App\Http\Requests\BaseRequest;

class WithdrawUpdateRequest extends BaseRequest
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
            "status" => "required|numeric|in:0,1,2,3,4"
        ];
    }
}
