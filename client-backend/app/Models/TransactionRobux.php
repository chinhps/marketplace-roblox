<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionRobux extends Model
{
    use HasFactory;
    protected $table = "transactions_robux";

    protected $fillable = [
        "user_id",
        "robux",
        "note"
    ];
}
