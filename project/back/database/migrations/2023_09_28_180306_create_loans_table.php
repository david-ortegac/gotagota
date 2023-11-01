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
         * Creates a new table called 'loans' in the database using Laravel's schema builder.
         *
         * @param void
         * @return void
         */
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->references('id')->on('clients');
            $table->decimal('amount'); //MONTO
            $table->string('paymentDays'); //fecha pago
            $table->string('type'); //tipo de pago diario o mensual (MODALIDAD)
            $table->bigInteger('abono'); //Abono diario
            $table->decimal('payment'); //ULTIMA CUOTA (PAGO)
            $table->decimal('pico'); // si da menos de la cuota

            $table->decimal('remainingAmount'); //ULTIMA CUOTA
            $table->integer('daysPastDue');
            $table->date('lastPayment');
            $table->date('startDate');
            $table->date('finalDate');

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
        Schema::dropIfExists('loans');
    }
};