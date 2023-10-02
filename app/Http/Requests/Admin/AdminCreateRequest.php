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
        $rules = [
            "id" => "nullable|exists:admins,id",
            "domain" => "nullable|exists:shop_list,domain",
            "provider_id" => "nullable|exists:users,provider_id",
            "admin_type" => "required|in:ADMIN,CTV,KOC",
            "name" => "required|string",
            "username" => "required|string|alpha_num|unique:admins,username," . request('id'),
            "block" => "boolean",
        ];

        if (!$this->input("id") || $this->input("password") != null) {
            $rules = [...$rules, "password" => "required|string|min:8"];
        }

        return $rules;
    }
}
