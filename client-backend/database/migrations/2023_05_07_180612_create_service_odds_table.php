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
        Schema::create('service_odds', function (Blueprint $table) {
            $table->id();
            $table->enum('odds_admin_type', ['FIXED', 'RANDOM']);
            $table->json('odds_admin')->nullable();
            $table->enum('odds_user_type', ['FIXED', 'RANDOM']);
            $table->json('odds_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_odds');
    }
};
