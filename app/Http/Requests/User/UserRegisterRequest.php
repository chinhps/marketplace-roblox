<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use App\Rules\Domain;

class UserRegisterRequest extends BaseRequest
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
            "username" => "bail|required|alpha_num|min:5|max:255|unique:users",
            "password" => "bail|required|string|min:8|confirmed",
        ];
    }

    public function messages(): array
    {
        return [
            // 'domain.required' => 'Trường Shop phải có',
            // 'domain.string' => 'Tên miền phải là chữ',
            // 'domain.exists' => 'Tên miền không tồn tại trong hệ thống',
            'domain.*' => 'Dữ liệu gửi lên đang gặp vấn đề! Liên hệ admin',
            'username.required' => 'Bạn cần nhập Tài khoản',
            'username.min' => 'Tài khoản quá ngắn 5 ký tự',
            'username.max' => 'Tài khoản quá dài 255 ký tự',
            'username.alpha_num' => 'Tên tài khoản phải là chữ và không có ký tự đặc biệt',
            'username.unique' => 'Tài khoản đã tồn tại trên hệ thống! Chọn 1 tài khoản khác',

            'password.required' => 'Bạn cần nhập mật khẩu',
            'password.string' => 'Mật khẩu của bạn phải là chuỗi',
            'password.min' => 'Mật khẩu ít nhất phải 8 ký tự',
            'password.confirmed' => 'Xác nhận mật khẩu không đúng',
        ];
    }
}
