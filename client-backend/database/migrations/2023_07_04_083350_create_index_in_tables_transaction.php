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
        Schema::table('transactions_price', function (Blueprint $table) {
            $table->index('user_id');
        });
        Schema::table('transactions_robux', function (Blueprint $table) {
            $table->index('user_id');
        });
        Schema::table('transactions_diamond', function (Blueprint $table) {
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions_price', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
        });
        Schema::table('transactions_robux', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
        });
        Schema::table('transactions_diamond', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
        });
    }
};
