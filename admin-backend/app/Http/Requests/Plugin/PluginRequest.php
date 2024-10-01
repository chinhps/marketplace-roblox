<?php

namespace App\Http\Requests\Plugin;

use App\Http\Requests\BaseRequest;
use App\Repository\Plugin\PluginInterface;

class PluginRequest extends BaseRequest
{

    public function __construct(
        private PluginInterface $pluginRepository
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
        $idPlugin = $this->input("id");
        $plugin = $this->pluginRepository->get((int)$idPlugin);
        $additionalRules = [];

        if (isset($plugin->form_public) && $plugin->form_public !== null) {
            $publicFormRules = json_decode($plugin->form_public, true);
            $additionalRules = array_merge($additionalRules, $this->extractInputRules($publicFormRules));
        }

        return [...$additionalRules, "id" => "exists:plugins,id"];
    }

    function extractInputRules($inputArray)
    {
        $rules = [];
        foreach ($inputArray as $input) {
            if (isset($input['name'])) {
                $rules["data." . $input['name']] = "required";
            }
        }
        return $rules;
    }
}
