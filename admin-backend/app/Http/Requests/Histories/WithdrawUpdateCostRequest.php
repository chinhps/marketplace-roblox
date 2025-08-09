<?php

namespace App\Http\Requests\Histories;

use App\Http\Requests\BaseRequest;
use Carbon\Carbon;

class WithdrawUpdateCostRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'from_date' => $this->input('from_date') ? Carbon::parse($this->input('from_date'))->startOfDay()->format('Y-m-d') : null,
            'to_date' => $this->input('to_date') ? Carbon::parse($this->input('to_date'))->endOfDay()->format('Y-m-d') : null,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "from_date" => "nullable|date",
            "to_date" => "nullable|date",
        ];
    }
}
