<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceGroup extends Model
{
    use HasFactory;
    protected $table = "service_groups";

    public function serviceDetails()
    {
        return $this->hasMany(ServiceDetail::class,'service_group_id','id');
    }
}
