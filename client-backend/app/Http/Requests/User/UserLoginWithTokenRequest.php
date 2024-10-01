<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UserLoginWithTokenRequest extends BaseRequest
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
            "token" => "bail|required|min:100",
        ]);
    }
}
