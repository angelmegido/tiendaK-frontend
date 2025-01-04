<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'required|string'
        ]);

        $userId = Auth::id();

        // Verificar si el usuario está autenticado
        if (!$userId) {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }

        // Verificar si el producto ya está en el carrito con el mismo tamaño
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $validatedData['product_id'])
            ->where('size', $validatedData['size'])
            ->first();

        if ($cartItem) {
            // Si existe, actualizar la cantidad
            $cartItem->quantity += $validatedData['quantity'];
            $cartItem->save();
        } else {
            // Si no existe, crear un nuevo registro
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $validatedData['product_id'],
                'quantity' => $validatedData['quantity'],
                'size' => $validatedData['size']
            ]);
        }

        return response()->json(['message' => 'Producto añadido al carrito'], 200);
    }

    public function getCart()
{
    $userId = Auth::id();

    if (!$userId) {
        return response()->json(['message' => 'Usuario no autenticado'], 401);
    }

    $cartItems = CartItem::where('user_id', $userId)
        ->with('product')
        ->get();

    return response()->json($cartItems);
}

public function clearCart()
{
    $userId = Auth::id();

    if (!$userId) {
        return response()->json(['message' => 'Usuario no autenticado'], 401);
    }

    CartItem::where('user_id', $userId)->delete();

    return response()->json(['message' => 'Carrito vaciado'], 200);
}
public function removeFromCart($productId)
{
    $userId = Auth::id();

    if (!$userId) {
        return response()->json(['message' => 'Usuario no autenticado'], 401);
    }

    CartItem::where('user_id', $userId)
        ->where('product_id', $productId)
        ->delete();

    return response()->json(['message' => 'Producto eliminado del carrito'], 200);
}

}
