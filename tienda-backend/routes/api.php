<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// Rutas de autenticación
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
});

// Rutas de productos
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::post('products', [ProductController::class, 'store'])->middleware('auth:api');
Route::put('products/{id}', [ProductController::class, 'update'])->middleware('auth:api');
Route::delete('products/{id}', [ProductController::class, 'destroy'])->middleware('auth:api');

// Rutas del carrito
Route::middleware('auth:api')->group(function () {
    Route::post('cart', [CartController::class, 'addToCart']);
    Route::get('cart', [CartController::class, 'getCart']);
    Route::delete('cart/clear', [CartController::class, 'clearCart']);
    Route::delete('cart/{productId}', [CartController::class, 'removeFromCart']);
});
