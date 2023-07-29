<?php

namespace App\Http\Requests;

class DomainRequest extends BaseRequest
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
        return $this->domainRules()['rules'];
    }

    public function messages(): array
    {
        return $this->domainRules()['messages'];
    }
}
