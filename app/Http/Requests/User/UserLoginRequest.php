<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UserLoginRequest extends BaseRequest
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
            "username" => [
                "bail",
                'required',
                'min:5',
                'max:255',
                'alpha_num',
                'exists:users',
            ],
            "password" => [
                "bail",
                'required',
                'string',
                'min:8',
            ]
        ]);
    }

    public function messages(): array
    {
        return array_merge($this->domainRules()['messages'], [
            "username.required" => 'Bạn cần nhập Tài khoản',
            "username.min" => 'Tài khoản quá ngắn 5 ký tự',
            "username.max" => 'Tài khoản quá dài 255 ký tự',
            "username.alpha_num" => 'Tên tài khoản phải là chữ và không có ký tự đặc biệt',
            "username.exists" => 'Tài khoản không tồn tại',
            "password.required" => 'Bạn cần nhập mật khẩu',
            "password.string" => 'Mật khẩu của bạn phải là chuỗi',
            "password.min" => 'Mật khẩu ít nhất phải 8 ký tự',
        ]);
    }
}
