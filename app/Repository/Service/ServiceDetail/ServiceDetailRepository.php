<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\ServiceDetail;
use Illuminate\Database\Eloquent\Model;

class ServiceDetailRepository implements ServiceDetailInterface
{
    public function __construct(
        private Model $model = new ServiceDetail()
    ) {
    }

    public function list($limit = 15)
    {
        return $this->model->with(['serviceImage', 'serviceGroup', 'serviceOdds', 'shop_list'])->paginate($limit);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }
}
