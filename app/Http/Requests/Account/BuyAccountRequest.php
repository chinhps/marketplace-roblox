<?php

namespace App\Http\Requests\Account;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class BuyAccountRequest extends BaseRequest
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
    public function rules()
    {
        return array_merge($this->domainRules()['rules'], [
            'id' => [
                'required', 'numeric', 'exists:account_list,id',
                Rule::exists('account_list')->where(function ($query) {
                    return $query->where('status', 'NOTSELL')->where('active', 'YES')->where('price', '>', 0);
                })
            ]
        ]);
    }

    public function messages()
    {
        return array_merge($this->domainRules()['messages'], [
            'id.required' => 'Thiếu id tài khoản!',
            'id.numeric' => 'Dữ liệu gửi lên không chính xác!',
            'id.exists' => 'Tài khoản đã có người khác mua hoặc không tồn tại! Vui lòng kiểm tra lại!',
        ]);
    }
}
