<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalLimit extends Model
{
    use HasFactory;
    protected $table = "withdrawal_limits";
    protected $guarded = [];
}
