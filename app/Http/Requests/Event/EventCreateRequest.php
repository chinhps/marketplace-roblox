<?php

namespace App\Http\Requests\Event;

use App\Http\Requests\BaseRequest;

class EventCreateRequest extends BaseRequest
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
            "id" => "nullable|exists:event_list,id",
            "name" => "required|string",
            "image" => "file|image",
            "active" => "required|in:ON,OFF",
        ];
    }
}
