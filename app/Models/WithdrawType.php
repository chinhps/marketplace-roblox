<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawType extends Model
{
    use HasFactory;
    protected $table = "withdraw_types";
    protected $guarded = [];
}
