<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawHistory extends Model
{
    use HasFactory;
    protected $table = "withdraw_histories";
    protected $fillable = [
        "status"
    ];
}
