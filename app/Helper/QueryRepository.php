<?php

use Illuminate\Database\Eloquent\Builder;

if (!function_exists('queryRepository')) {
    function queryRepository(Builder $model, array $filter)
    {
        if (isset($filter['query'])) {
            $model->where($filter['query']);
        }
        if (isset($filter['sort'])) {
            foreach ($filter['sort'] as $valueSort) {
                $model->orderBy($valueSort[0], $valueSort[1]);
            }
        }
        if (isset($filter['user_filter'])) {
            $model->whereHas('user', function ($subquery) use ($filter) {
                $subquery->where('name', 'like', '%' . $filter['user_filter'] . '%');
            });
        }
        if (isset($filter['user_provider_id_filter'])) {
            $model->whereHas('user', function ($subquery) use ($filter) {
                $subquery->where('provider_id', $filter['user_provider_id_filter']);
            });
        }
        if (isset($filter['shop_filter'])) {
            $model->whereHas('shop', function ($subquery) use ($filter) {
                $subquery->where('domain', 'like', '%' . $filter['shop_filter'] . '%');
            });
        }
        if (isset($filter['shop_user_filter'])) {
            $model->whereHas('user.shop', function ($subquery) use ($filter) {
                $subquery->where('domain', 'like', '%' . $filter['shop_user_filter'] . '%');
            });
        }
        if (isset($filter['service_filter'])) {
            $model->whereHas('service', function ($subquery) use ($filter) {
                $subquery->where('note', 'like', '%' . $filter['service_filter'] . '%');
            });
        }
        if (isset($filter['gameListByService_fillter'])) {
            $model->whereHas('service.game_list', function ($subquery) use ($filter) {
                $subquery->where('game_key', 'like', '%' . $filter['gameListByService_fillter'] . '%');
            });
        }
        if (isset($filter['admin_filter'])) {
            $model->whereHas('admin', function ($subquery) use ($filter) {
                $subquery->where('name', 'like', '%' . $filter['admin_filter'] . '%');
            });
        }
        if (!isset($filter['sort'])) {
            $model->orderBy('id', 'desc');
        }

        return $model;
    };
}
