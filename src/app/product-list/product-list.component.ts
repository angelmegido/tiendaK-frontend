import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addToCart(productId: number, quantity: number, size: string): void {
    this.cartService.addToCart(productId, quantity, size).subscribe({
      next: (response) => {
        console.log('Producto añadido al carrito', response);
      },
      error: (error) => {
        console.error('Error al añadir el producto al carrito:', error);
      },
    });
  }
}
