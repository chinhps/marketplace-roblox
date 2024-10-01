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
        Schema::create('withdrawal_limits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('withdraw_type_id')->constrained('withdraw_types');
            $table->float('withdraw_limit', 15, 0)->default(0);
            $table->enum('active', ["ON", "OFF"])->default("ON");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('withdrawal_limits', function (Blueprint $table) {
            //
        });
    }
};
