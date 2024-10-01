<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDiamond extends Model
{
    use HasFactory;
    protected $table = "transactions_diamond";

    protected $fillable = [
        "user_id",
        "diamond",
        "note"
    ];
 }
