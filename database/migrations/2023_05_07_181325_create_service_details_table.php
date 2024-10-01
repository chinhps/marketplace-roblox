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
        Schema::create('service_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_group_id')->constrained();
            $table->foreignId('service_id')->constrained();
            $table->foreignId('service_odds_id')->nullable()->constrained();
            $table->foreignId('service_image_id')->nullable()->constrained();
            $table->unsignedInteger('prioritize');
            $table->string('name');
            $table->enum('excluding', ['ON', 'OFF']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_details');
    }
};
