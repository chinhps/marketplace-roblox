<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\Service;
use App\Models\ServiceDetail;
use App\Models\ServiceGroup;
use App\Models\ServiceImage;
use App\Models\ServiceOdds;
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

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function updateOrInsert(
        float|null $id,
        array $params,
        array $domainsId,
        Service $service,
        ServiceGroup $serviceGroup,
        ServiceImage $serviceImage,
        ?ServiceOdds $serviceOdds
    ) {

        if (!$id) {
            $serviceDetail = new ServiceDetail();
            $serviceDetail->fill($params);
        }
        if ($id) {
            $serviceDetail = $this->model->find($id);
            $serviceDetail->fill($params);
        }

        $serviceDetail->service()->associate($service);
        $serviceDetail->serviceGroup()->associate($serviceGroup);
        $serviceDetail->serviceImage()->associate($serviceImage);
        $serviceDetail->serviceOdds()->associate($serviceOdds);
        $serviceDetail->save();
        $serviceDetail->shop_list()->sync($domainsId);

        return $serviceDetail;
    }
}
