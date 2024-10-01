<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->foreign('shop_id')->references('id')->on('shop_list')->onDelete('cascade');
            $table->string('provider_id', 20);
            $table->string('name');
            $table->string('username');
            $table->float('price_temporary', 15, 0)->nullable();
            $table->float('diamond_temporary', 15, 0)->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->enum('block', ['on', 'off']);
            $table->enum('active', ['on', 'off']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
