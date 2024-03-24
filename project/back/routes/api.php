<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\SedeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::resource('/sedes', SedeController::class);
    Route::get('sedes_all', [SedeController::class, 'getAll'])->name('sedes.getAll');

    Route::resource('/routes', RouteController::class);
    Route::get('routes_all', [RouteController::class, 'getAll'])->name('routes.getAll');

    Route::resource('/clients', ClientController::class);
    Route::get('clients_all', [ClientController::class, 'getAll'])->name('clients.getAll');
});




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




