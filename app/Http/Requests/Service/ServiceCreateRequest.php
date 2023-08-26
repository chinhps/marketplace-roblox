<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class ServiceCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:services,id",
            "game_id" => "required|exists:games_list,id",
            "game_currency_id" => "required|exists:game_currencies,id",
            "note" => "required",
            "notification" => "required",
            "price" => "required|numeric",
            "active" => "required|in:ON,OFF",
            "sale" => "required|numeric|min:0|max:100",
            "information" => "json"
        ];
    }
}
