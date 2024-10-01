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
        Schema::table('recharge_histories', function (Blueprint $table) {
            $table->enum('refund', ['yes', 'no'])->default('no')->change();
            $table->enum('status', ['PENDING', 'ERROR', 'SUCCESS'])->default('PENDING')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recharge_histories', function (Blueprint $table) {
            $table->tinyInteger('refund')->default(0)->change();
            $table->tinyInteger('status')->default(0)->change();
        });
    }
};
