<?php

namespace App\Repository\Service\ServiceGroup;

use App\Models\ServiceGroup;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use Illuminate\Database\Eloquent\Model;

class ServiceGroupRepository implements ServiceGroupInterface
{

    public function __construct(
        private Model $model = new ServiceGroup(),
    ) {
    }

    public function serviceGroupList(array $idListAllow)
    {
        return $this->model->where('active', 'ON')
            ->whereHas('serviceDetails', function ($query) use ($idListAllow) {
                $query->whereIn('id', $idListAllow);
            })->with([
                'serviceDetails' => function ($query) use ($idListAllow) {
                    $query->select(
                        "id",
                        "service_group_id",
                        "service_id",
                        "service_odds_id",
                        "service_image_id",
                        "slug",
                    )->orderBy('prioritize', 'asc')->whereIn('id', $idListAllow)->with([
                        'service' => function ($query) {
                            $query->select(
                                "id",
                                "price",
                                "sale",
                                "note",
                                "notification",
                                "information",
                                "game_id",
                                "parent_id"
                            )->with(['game_list', 'serviceCounter'])->withCount(['accounts' => function ($query) {
                                $query->where('status', 'NOTSELL');
                            }]); //->where('parent_id', null);
                        },
                        'serviceImage' => function ($query) {
                            $query->select(
                                "id",
                                "thumb",
                                "images",
                                "name",
                            );
                        }
                    ]);
                }
            ])->select('id', 'name', 'image')->orderBy('prioritize', 'desc')->get();
    }
}
