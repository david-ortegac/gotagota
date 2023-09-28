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
        Schema::create('spread_sheets', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->boolean('pay')->default(false);
            $table->double('amount');
            $table->integer('remainingTime');
            $table->double('remainingAmount');
            $table->double('daysPastDue');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spread_sheets');
    }
};