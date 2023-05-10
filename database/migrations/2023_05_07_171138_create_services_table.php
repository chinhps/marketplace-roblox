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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('game_id');
            $table->foreign('game_id')->references('id')->on('games_list');
            $table->enum('service_type', ['WHEEL', 'LUCKY_BOX', 'LUCKY_CARD', 'RANDOM', 'ROBUX_BOX']);
            $table->string('service_key')->unique();
            $table->enum('excluding', ['ON', 'OFF']);
            $table->float('price');
            $table->integer('sale')->unsigned()->default(100);
            $table->text('notification')->nullable();
            $table->json('information')->nullable();
            $table->string('note')->nullable();
            $table->string('slug')->unique();
            $table->enum('active', ['ON', 'OFF'])->default('ON');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
