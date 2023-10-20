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
            $table->enum('withdraw_type', ['ROBUX', 'DIAMOND', 'BUY_ROBUX', 'GAMEPASS'])->change();
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
