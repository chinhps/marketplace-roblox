<?php

namespace App\Http\Requests\TopRecharge;

use App\Http\Requests\BaseRequest;

class TopRechargeRequest extends BaseRequest
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
        return array_merge($this->domainRules()['rules'], [
            "time" => "bail|required|string|in:present,last-month",
        ]);
    }

    public function messages(): array
    {
        return array_merge($this->domainRules()['messages'], [
            "username.required" => 'Bạn cần nhập Tài khoản',
            "username.min" => 'Tài khoản quá ngắn 5 ký tự',
        ]);
    }
}
