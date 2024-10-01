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
        Schema::table('service_histories_virtual', function (Blueprint $table) {
            $table->dropColumn('detail');
            $table->string('text',150);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_histories_virtual', function (Blueprint $table) {
            //
        });
    }
};
