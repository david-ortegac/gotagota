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
            $table->foreignId('loan_id')->references('id')->on('loans');
            $table->foreignId('employee_id')->references('id')->on('employees');
            $table->integer('order');
            $table->date('date');
            $table->decimal('pay');
            $table->decimal('amount');
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