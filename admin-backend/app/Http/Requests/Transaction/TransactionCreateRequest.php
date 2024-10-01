<?php

namespace App\Http\Requests\Transaction;

use App\Http\Requests\BaseRequest;

class TransactionCreateRequest extends BaseRequest
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
            "user_id" => "required|exists:users,id",
            "currency" => "required|in:PRICE,ROBUX,DIAMOND",
            "transaction_type" => "required|in:increase,decrease",
            "value" => "required|numeric|min:0",
            "note" => "required|min:3"
        ];
    }
}
