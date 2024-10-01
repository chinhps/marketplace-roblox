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
        Schema::table('account_list', function (Blueprint $table) {
            $table->enum("active",['YES','NO'])->comment("Kích hoạt(YES) mới có thể mua")->change();
            $table->enum("status",['SOLD','NOTSELL'])->comment("Đã bán(SOLD) - Chưa bán(NOTSELL)")->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_list', function (Blueprint $table) {
            //
        });
    }
};
