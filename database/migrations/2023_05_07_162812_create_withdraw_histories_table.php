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
        Schema::create('withdraw_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('shop_id')->constrained('shop_list');
            $table->string('task_number');
            $table->enum('withdraw_type', ['ROBUX', 'DIAMOND']);
            $table->float('value', 15, 0);
            $table->float('cost', 15, 0);
            $table->enum('status', [0, 1, 2, 3, 4])->default(0);
            $table->json('detail')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraw_histories');
    }
};
