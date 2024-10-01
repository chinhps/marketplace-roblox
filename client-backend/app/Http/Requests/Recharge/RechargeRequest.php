<?php

namespace App\Http\Requests\Recharge;

use App\Http\Requests\BaseRequest;

class RechargeRequest extends BaseRequest
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
            'card_type' => 'required|max:15|in:Viettel,Vinaphone,Mobifone',
            'amount' => 'required|numeric|in:10000,20000,30000,50000,100000,200000,300000,500000,1000000',
            'pin' => 'required|numeric',
            'serial' => 'required|numeric',
            'h' => 'nullable|boolean'
        ];
    }

    public function messages(): array
    {
        return [
            'card_type.required' => 'Chưa chọn loại thẻ',
            'card_type.max' => 'Có gì sai! vui lòng liên hệ admin',
            'card_type.in' => 'Loại thẻ không đúng',
            'amount.required' => 'Chưa chọn giá tiền',
            'amount.numeric' => 'Dữ liệu nhập vào sai',
            'pin.required' => 'Chưa nhập mã thẻ',
            'pin.numeric' => 'có gì sai! vui lòng liên hệ admin',
            'serial.required' => 'Chưa nhập seri thẻ',
            'serial.numeric' => 'có gì sai! vui lòng liên hệ admin',
            'h' => 'có gì sai! vui lòng liên hệ admin'
        ];
    }
}
