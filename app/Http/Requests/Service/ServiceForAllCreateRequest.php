<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class ServiceForAllCreateRequest extends BaseRequest
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
        $data = $this->all();
        $modifiedData = $this->mergeArrays(json_decode($data['dataDefault'], true), $data);
        $this->replace($modifiedData);
        return [
            'dataForm.name_service_image' => 'required|string',
            'dataForm.note_service' => 'required|string',
            'dataForm.price_service' => 'required|numeric',
            'dataForm.sale_service' => 'required|numeric',
            'dataForm.active_service' => 'required|boolean',
            'dataForm.notification_service' => 'required|string',
            'dataForm.thumb_service_image.*' => 'required|file|image',
            'dataForm.image_1.*' => 'nullable|file|image',
            'dataForm.image_2.*' => 'nullable|file|image',
            'dataForm.image_3.*' => 'nullable|file|image',
            // ==========================

            'dataOdds.isRandomAdmin' => 'required|boolean',
            'dataOdds.isRandomUser' => 'required|boolean',

            'dataOdds.oddsAdmin.*' => 'required|array', // Change to *.* to support nested arrays
            'dataOdds.oddsAdmin.*.id' => 'required|numeric',
            'dataOdds.oddsAdmin.*.description' => 'required|string',
            'dataOdds.oddsUser.*' => 'required|array', // Change to *.* to support nested arrays
            'dataOdds.oddsUser.*.id' => 'required|numeric',
            'dataOdds.oddsUser.*.description' => 'required|string',

            'dataOdds.listGift.*' => 'required|array', // Change to *.* to support nested arrays
            'dataOdds.listGift.*.image' => 'required|file|image',
            'dataOdds.listGift.*.isRandom' => 'required|boolean',
            'dataOdds.listGift.*.isVip' => 'required|boolean',
            'dataOdds.listGift.*.message' => 'required|string',
            'dataOdds.listGift.*.percent' => 'required|numeric',
            'dataOdds.listGift.*.typeGift' => 'required|string',
            'dataOdds.listGift.*.value' => 'required|numeric',

            // ==========================
            'dataExcept.*' => 'string',
        ];
    }

    public function mergeArrays($arrayA, $arrayB)
    {
        foreach ($arrayB as $key => $valueB) {
            if (array_key_exists($key, $arrayA)) {
                if (is_array($valueB) && is_array($arrayA[$key])) {
                    $arrayA[$key] = $this->mergeArrays($arrayA[$key], $valueB);
                } else {
                    $arrayA[$key] = $valueB;
                }
            } else {
                $arrayA[$key] = $valueB;
            }
        }
        return $arrayA;
    }
}
