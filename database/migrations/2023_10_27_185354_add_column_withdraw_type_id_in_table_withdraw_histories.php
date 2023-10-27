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
        Schema::table('withdraw_histories', function (Blueprint $table) {
            $table->unsignedBigInteger('withdraw_type_id')->nullable();
            $table->foreign('withdraw_type_id')->references('id')->on('withdraw_types')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('withdraw_histories', function (Blueprint $table) {
            //
        });
    }
};
