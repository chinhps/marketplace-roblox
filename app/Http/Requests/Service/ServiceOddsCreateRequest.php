<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;
use App\Rules\ExistInDatabase;

class ServiceOddsCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:service_odds,id",
            "odds_admin_type" => "required|in:RANDOM,FIXED",
            "odds_admin" => [
                "required",
                // "array",
                new ExistInDatabase('service_odds', 'id')
            ],
            "odds_user_type" => "required|in:RANDOM,FIXED",
            "odds_user" => [
                "required",
                // "array",
                new ExistInDatabase('service_odds', 'id')
            ],

        ];
    }
}
