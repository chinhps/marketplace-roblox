<?php

namespace App\Repository\Event;

use App\Models\EventList;
use Illuminate\Database\Eloquent\Model;

class EventRepository implements EventInterface
{
    public function __construct(
        private Model $model = new EventList()
    ) {
    }

    public function getLastEvent()
    {
        $data = $this->model->where("active", "ON")->orderBy("id", "desc")->first();
        return $data;
    }
}
