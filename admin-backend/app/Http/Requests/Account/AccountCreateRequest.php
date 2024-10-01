<?php

namespace App\Http\Requests\Account;

use App\Http\Requests\BaseRequest;
use App\Repository\Service\ServiceInterface;
use App\Rules\UrlOrFileImage;

class AccountCreateRequest extends BaseRequest
{

    public function __construct(
        private ServiceInterface $serviceRepository
    ) {
    }

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

        $commonRules = [
            "id" => "nullable|exists:account_list,id",
            "idServiceGame" => "exists:services,id",
            "data.price" => "required|numeric|min:0",
            "data.note" => "required",
            "data.active" => "boolean",
            "data.thumb.*" => ["nullable", new UrlOrFileImage],
            "data.images.*" => ["nullable", new UrlOrFileImage],
        ];

        $idServiceGame = $this->input("idServiceGame");
        $service = $this->serviceRepository->get((int)$idServiceGame);

        $additionalRules = [];

        if (isset($service->private_form) && $service->private_form !== null) {
            $privateFormRules = json_decode($service->private_form, true);
            $additionalRules = array_merge($additionalRules, $this->extractInputRules($privateFormRules));
        }

        if (isset($service->public_form) && $service->public_form !== null) {
            $publicFormRules = json_decode($service->public_form, true);
            $additionalRules = array_merge($additionalRules, $this->extractInputRules($publicFormRules));
        }

        return array_merge($commonRules, $additionalRules);
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

    function extractInputRules($inputArray)
    {
        $rules = [];
        foreach ($inputArray as $input) {
            if (isset($input['name'])) {
                $rules['data.' . $input['name']] = "required";
            }
        }
        return $rules;
    }
}
