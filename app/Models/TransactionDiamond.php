<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionDiamond extends Model
{
    use HasFactory;
    protected $table = "transactions_diamond";

    protected $fillable = [
        "user_id",
        "diamond",
        "note"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
 }
