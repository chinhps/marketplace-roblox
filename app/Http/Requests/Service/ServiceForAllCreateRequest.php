<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;
use App\Rules\UrlOrFileImage;

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

        $rules = [
            'dataForm.name_service_image' => 'required|string',
            'dataForm.note_service' => 'required|string',
            'dataForm.prioritize' => 'required|numeric',
            'dataForm.sale_service' => 'required|numeric|min:0',
            'dataForm.active_service' => 'required|boolean',
            'dataForm.notification_service' => 'required|string',
            'dataForm.thumb_service_image.*' =>  ["required", new UrlOrFileImage],
            'dataForm.image_1.*' =>  ["nullable", new UrlOrFileImage],
            'dataForm.image_2.*' =>  ["nullable", new UrlOrFileImage],
            'dataForm.image_3.*' =>  ["nullable", new UrlOrFileImage],
            'dataForm.image_4.*' =>  ["nullable", new UrlOrFileImage],
            'dataForm.image_5.*' =>  ["nullable", new UrlOrFileImage],
            // ==========================
            'dataOdds' => 'nullable',
            // ==========================
            'dataExcept.*' => 'string',
            'except' => 'boolean',
            'typeService' => 'required|string',
            'idService' => 'nullable|exists:services,id',
            'idServiceDetail' => 'nullable|exists:service_details,id',
            'idGroup' => 'required|exists:service_groups,id',
        ];

        if (
            $this->input("typeService") !== "ACCOUNT" ||
            $this->input("typeService") !== "CATEGORY"  ||
            $this->input("typeService") !== "LINKTO"
        ) {
            $rules = [
                ...$rules,
                'dataForm.price_service' => 'required|numeric|min:0',
            ];
        }

        if ($this->input("typeService") === "LINKTO") {
            $rules = [
                ...$rules,
                "dataForm.link_to" => 'required|string'
            ];
        }

        if ($this->input("typeService") === "BOX") {
            $rules = [
                ...$rules,
                "dataForm.currency" => 'required|numeric|exists:game_currencies,id'
            ];
        }

        if ($this->input("idTypeOdds") !== 0) {
            $rules = [
                ...$rules,
                "idTypeOdds" => 'required|numeric|exists:service_odds,id'
            ];
        } else {
            $rules = [
                ...$rules,
                "idTypeOdds" => 'required|numeric'
            ];
        }

        if (!is_null($this->input("dataOdds"))) {
            // dd($this->input("dataOdds"));
            $rules = [
                ...$rules,
                'dataOdds.isRandomAdmin' => 'required|boolean',
                'dataOdds.isRandomUser' => 'required|boolean',
                'dataOdds.oddsAdmin.*' => 'required|array', // Change to *.* to support nested arrays
                'dataOdds.oddsAdmin.*.id' => 'required|numeric',
                'dataOdds.oddsAdmin.*.description' => 'required|string',
                'dataOdds.oddsUser.*' => 'required|array', // Change to *.* to support nested arrays
                'dataOdds.oddsUser.*.id' => 'required|numeric',
                // 'dataOdds.oddsUser.*.description' => 'required|string',
                'dataOdds.listGift.*' => 'required|array', // Change to *.* to support nested arrays
                'dataOdds.listGift.*.image.*' => 'nullable|file|image',
                'dataOdds.listGift.*.isRandom' => 'required|boolean',
                'dataOdds.listGift.*.isVip' => 'required|boolean',
                // 'dataOdds.listGift.*.message' => 'required|string',
                'dataOdds.listGift.*.percent' => 'required|numeric',
                'dataOdds.listGift.*.typeGift' => 'required|string',
                'dataOdds.listGift.*.value' => 'required',
            ];
        }

        return $rules;
    }

    public function mergeArrays($arrayA, $arrayB)
    {
        foreach ($arrayB as $key => $valueB) {
            if (array_key_exists($key, $arrayA)) {
                if (is_array($valueB) && is_array($arrayA[$key])) {
                    $arrayA[$key] = $this->mergeArrays($arrayA[$key], $valueB);
                } else {
                    if (gettype($arrayA[$key]) !== "boolean" && gettype($arrayA[$key]) !== "integer" && gettype($arrayA[$key]) !== "NULL") {
                        $arrayA[$key] = $valueB;
                    }
                }
            } else {
                $arrayA[$key] = $valueB;
            }
        }
        return $arrayA;
    }
}
