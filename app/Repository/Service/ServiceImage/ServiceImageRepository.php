<?php

namespace App\Repository\Service\ServiceImage;

use App\Models\ServiceImage;
use Illuminate\Database\Eloquent\Model;

class ServiceImageRepository implements ServiceImageInterface
{
    public function __construct(
        private Model $model = new ServiceImage()
    ) {
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        return $this->model->create($params);
    }
}
