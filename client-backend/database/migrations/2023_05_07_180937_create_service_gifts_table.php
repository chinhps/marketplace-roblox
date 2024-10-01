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
        Schema::create('service_gifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('odds_id')->constrained('service_odds');
            $table->foreignId('game_currency_id')->constrained('game_currencies');
            $table->enum('gift_type', ['RANDOM', 'FIXED']);
            $table->string('image')->nullable();
            $table->integer('value1')->nullable();
            $table->integer('value2')->nullable();
            $table->boolean('vip')->default(false);
            $table->float('cost');
            $table->float('percent_random')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_gifts');
    }
};
