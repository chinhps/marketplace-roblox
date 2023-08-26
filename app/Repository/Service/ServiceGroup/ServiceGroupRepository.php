<?php

namespace App\Repository\Service\ServiceGroup;

use App\Models\ServiceGroup;
use Illuminate\Database\Eloquent\Model;

class ServiceGroupRepository implements ServiceGroupInterface
{
    public function __construct(
        private Model $model = new ServiceGroup()
    ) {
    }

    public function list($limit = 15)
    {
        return $this->model->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        if (!$id) return $this->model->create($params);

        $data = $this->model->find($id);
        $data->update($params);
        return $data;
    }
}
