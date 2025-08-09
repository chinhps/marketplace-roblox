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
        Schema::table('service_gifts', function (Blueprint $table) {
            $table->integer("cost_type")->nullable()->after("cost")->comment("1: Robux - 2: ATM");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_gifts', function (Blueprint $table) {
            $table->dropColumn("cost_type");
        });
    }
};
