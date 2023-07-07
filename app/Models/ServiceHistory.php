<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceHistory extends Model
{
    use HasFactory;
    protected $table = "service_histories";

    protected $fillable = [
        "id",
        "user_id",
        "service_id",
        "shop_id",
        "quantity",
        "detail"
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(Service::class);
    }
}
