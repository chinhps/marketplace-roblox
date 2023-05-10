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
        Schema::create('plugin_except_shop', function (Blueprint $table) {
            $table->unsignedBigInteger('plugin_id');
            $table->unsignedBigInteger('shop_id');
            $table->foreign('plugin_id')->references('id')->on('plugins')->onDelete('cascade');
            $table->foreign('shop_id')->references('id')->on('shop_list')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plugin_except_shop');
    }
};
