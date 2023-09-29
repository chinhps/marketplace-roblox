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
    
    public function getByKey(string $key)
    {
        $data = $this->model->where('plugin_key', $key)->first();
        $result = [];
        foreach(json_decode($data->data_public,true) as $item) {
            $result[$item['key']] = $item['value'];
        }
        return $result;
    }
}
