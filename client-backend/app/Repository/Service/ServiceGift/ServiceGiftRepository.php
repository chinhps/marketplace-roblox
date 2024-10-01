<?php

namespace App\Repository\Service\ServiceGift;

use App\Models\ServiceGift;
use Illuminate\Database\Eloquent\Model;

class ServiceGiftRepository implements ServiceGiftInterface
{
    public function __construct(
        private Model $model = new ServiceGift()
    ) {
    }

    public function get(float $id)
    {
        $data = $this->model->find($id);
        return $data;
    }
}
