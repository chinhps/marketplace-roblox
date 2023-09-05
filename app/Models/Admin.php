<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "admins";
    protected $fillable = [
        'id',
        'shop_id',
        'user_id',
        'admin_type',
        'name',
        'username',
        'password',
        'block',
        'active',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function shop()
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
