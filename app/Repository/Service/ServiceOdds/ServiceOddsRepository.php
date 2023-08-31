<?php

namespace App\Repository\Service\ServiceOdds;

use App\Models\ServiceOdds;
use Illuminate\Database\Eloquent\Model;

class ServiceOddsRepository implements ServiceOddsInterface
{
    public function __construct(
        private Model $model = new ServiceOdds()
    ) {
    }

    public function list($limit = 15)
    {
        return $this->model->withCount('serviceDetails')->paginate($limit);
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