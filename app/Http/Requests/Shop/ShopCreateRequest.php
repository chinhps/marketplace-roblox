<?php

namespace App\Http\Requests\Shop;

use App\Http\Requests\BaseRequest;
use App\Rules\UrlOrFileImage;

class ShopCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:shop_list,id",
            "domain" => "required|string|unique:shop_list,domain," . request('id'),
            "shop_title" => "required|string",
            "cash_new_user" => "required|string|numeric|min:0",
            "keyword" => "required|string",
            "logo_url.*" => ["required", new UrlOrFileImage],
            "favicon_url.*" => ["required", new UrlOrFileImage],
            "background_url.*" => ['required', new UrlOrFileImage],
        ];
    }
}
