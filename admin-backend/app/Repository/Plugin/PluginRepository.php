<?php

namespace App\Repository\Plugin;

use App\Models\Plugin;
use Illuminate\Database\Eloquent\Model;

class PluginRepository implements PluginInterface
{
    public function __construct(
        private Model $model = new Plugin()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $data = $this->model->with('shop_list');
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with('shop_list')->find($id);
    }

    public function getByKey(string $key)
    {
        $data = $this->model->where('status', 'ON')->where('plugin_key', $key)->first();
        if (!$data) {
            return [];
        }
        $result = [];
        foreach (json_decode($data->data_public, true) as $item) {
            $result[$item['key']] = $item['value'];
        }
        return $result;
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        if (!$id) return $this->model->create($params);

        $data = $this->model->find($id);
        $data->fill($params);
        $data->save();
        return $data;
    }
}
