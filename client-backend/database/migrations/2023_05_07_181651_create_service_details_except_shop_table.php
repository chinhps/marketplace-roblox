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
        Schema::create('service_details_except_shop', function (Blueprint $table) {
            $table->unsignedBigInteger('service_detail_id');
            $table->unsignedBigInteger('shop_id');

            $table->foreign('service_detail_id')->references('id')->on('service_details')->onDelete('cascade');
            $table->foreign('shop_id')->references('id')->on('shop_list')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_details_except_shop');
    }
};
