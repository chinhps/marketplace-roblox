<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionPrice extends Model
{
    use HasFactory;
    protected $table = "transactions_price";

    protected $fillable = [
        "user_id",
        "price",
        "note"
    ];
}
