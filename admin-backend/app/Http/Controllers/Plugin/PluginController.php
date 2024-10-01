<?php

namespace App\Http\Controllers\Plugin;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Plugin\PluginRequest;
use App\Http\Resources\Plugin\PluginListResource;
use App\Repository\Plugin\PluginInterface;
use Illuminate\Http\Request;

class PluginController extends Controller
{

    public function __construct(
        private PluginInterface $pluginRepository
    ) {
    }

    public function list(Request $request)
    {
        $name = $request->input('name');

        $filter = [];
        if ($name) {
            $filter['query'][] = ['name', 'like', "%$name%"];
        }
        return PluginListResource::collection($this->pluginRepository->list(15, $filter));
    }

    public function getId($id)
    {
        return new PluginListResource($this->pluginRepository->get($id));
    }

    public function upsert(PluginRequest $request)
    {
        $validated = $request->validated();
        $plugin = $this->pluginRepository->get($validated['id']);
        $publicForm = $this->getDataForm(json_decode($plugin->form_public, true), $validated['data']);

        $this->pluginRepository->updateOrInsert($validated['id'], [
            "data_public" => json_encode($publicForm)
        ]);
        return BaseResponse::msg("Cập nhật thành công!");
    }

    private function getDataForm(array $array, array $values)
    {
        $result = [];
        foreach ($array as $item) {
            $result[] = [
                "key" => $item['name'],
                "name" => $item['label'],
                "value" => $values[$item['name']]
            ];
        }
        return $result;
    }
}
