<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use App\Rules\Domain;

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
        return [
            "domain" => ["bail", "required", "string", "exists:shop_list,domain", new Domain],
            "username" => [
                "bail",
                'required', // Tài khoản là bắt buộc
                'min:5', // Tài khoản tối thiểu 5 ký tự
                'max:255', // Tài khoản tối đa 255 ký tự
                'alpha_num', // Tài khoản chỉ chứa chữ và số, không có ký tự đặc biệt
                'exists:users', // Tài khoản phải tồn tại trong bảng 'users'
            ],
            "password" => [
                "bail",
                'required', // Mật khẩu là bắt buộc
                'string', // Mật khẩu phải là chuỗi
                'min:8', // Mật khẩu tối thiểu 8 ký tự
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'domain.*' => 'Dữ liệu gửi lên đang gặp vấn đề! Liên hệ admin',
            "username.required" => 'Bạn cần nhập Tài khoản',
            "username.min" => 'Tài khoản quá ngắn 5 ký tự',
            "username.max" => 'Tài khoản quá dài 255 ký tự',
            "username.alpha_num" => 'Tên tài khoản phải là chữ và không có ký tự đặc biệt',
            "username.exists" => 'Tài khoản không tồn tại',
            "password.required" => 'Bạn cần nhập mật khẩu',
            "password.string" => 'Mật khẩu của bạn phải là chuỗi',
            "password.min" => 'Mật khẩu ít nhất phải 8 ký tự',
        ];
    }
}
