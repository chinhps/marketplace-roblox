<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRegisterRequest extends FormRequest
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
            "username" => "required|alpha_num|min:5|max:255|unique:users",
            "password" => "required|string|min:8|confirmed",
        ];
    }

    public function messages(): array
    {
        return [
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

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(["msg" => $validator->errors()->all()], 422));
    }
}
