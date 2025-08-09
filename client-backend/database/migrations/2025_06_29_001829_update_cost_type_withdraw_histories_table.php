<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('withdraw_histories')
            ->whereIn('withdraw_type', ['GAMEPASS'])
            ->whereDate('created_at', '<=', '2025-06-19')
            ->whereNull('cost_type')
            ->update(['cost_type' => 1]); // Roblox
        DB::table('withdraw_histories')
            ->whereIn('withdraw_type', ['UNIT','GEMS'])
            ->whereDate('created_at', '<=', '2025-06-19')
            ->whereNull('cost_type')
            ->update(['cost_type' => 2]); // ATM
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
