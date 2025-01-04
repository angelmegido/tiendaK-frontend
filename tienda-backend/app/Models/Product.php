<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'printful_variant_id',
    ];


    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
