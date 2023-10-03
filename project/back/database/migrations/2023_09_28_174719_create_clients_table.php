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
        /**
         * Creates a new table called 'clients' in the database.
         *
         * @param void
         * @return void
         */
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->references('id')->on('routes');
            $table->string('name');
            $table->string('last_name');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('neighborhood');
            $table->string('address');
            $table->string('city');
            $table->string('profession');
            $table->text('notes');
            $table->string('type');
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users');
            $table->unsignedBigInteger('modified_by');
            $table->foreign('modified_by')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};