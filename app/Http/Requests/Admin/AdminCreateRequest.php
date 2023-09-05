<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\BaseRequest;

class AdminCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:admins,id",
            "shop_id" => "nullable|exists:shop_list,id",
            "user_id" => "nullable|exists:users,id",
            "admin_type" => "required|in:ADMIN,CTV,KOC",
            "name" => "required|string",
            "username" => "required|string|alpha_num|unique:admins,username," . request('id'),
            "password" => "required|string|confirmed|min:8",
            "block" => "boolean",
            "active" => "boolean",
        ];
    }
}
