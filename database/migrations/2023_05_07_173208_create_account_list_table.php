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
        Schema::create('account_list', function (Blueprint $table) {
            $table->id();
            $table->integer('prioritize');
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('service_id');
            $table->json('detail_public')->nullable();
            $table->json('detail_private')->nullable();
            $table->float('price', 15, 0);
            $table->string('thumb')->nullable();
            $table->json('images')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->foreign('admin_id')->references('id')->on('admins');
            $table->foreign('service_id')->references('id')->on('services');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_list');
    }
};
