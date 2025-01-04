import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: { product: Product; quantity: number; size: string }[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        console.log('Datos del carrito recibidos:', data);
        this.items = data.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
          size: item.size,
        }));
        this.calculateTotal();
      },
      (error: any) => {
        console.error('Error al obtener los elementos del carrito:', error);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.items = [];
      this.calculateTotal();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.items = this.items.filter((item) => item.product.id !== productId);
      this.calculateTotal();
    });
  }
}
