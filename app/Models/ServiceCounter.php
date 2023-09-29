<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceCounter extends Model
{
    use HasFactory;
    protected $table = "services_counters";
    protected $guarded = [];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, "service_id");
    }
}
