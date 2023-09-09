<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountList extends Model
{
    use HasFactory;
    protected $table = "account_list";
    protected $guarded = [];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
