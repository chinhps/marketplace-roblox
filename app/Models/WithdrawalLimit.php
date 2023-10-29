<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WithdrawalLimit extends Model
{
    use HasFactory;
    protected $table = "withdrawal_limits";
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function withdrawType(): BelongsTo
    {
        return $this->belongsTo(WithdrawType::class, 'withdraw_type_id');
    }
}
