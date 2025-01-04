import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  sizes: string[] = ['S', 'M', 'L', 'XL']; // Ejemplo de tallas
  selectedSize: string | null = null;
  quantity: number = 1; // Cantidad inicial

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (this.selectedSize && this.product && this.quantity >= 1) {
      this.cartService
        .addToCart(this.product.id, this.quantity, this.selectedSize)
        .subscribe(
          (response) => {
            this.snackBar.open('Producto añadido al carrito', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
          },
          (error) => {
            this.snackBar.open(
              'Debe iniciar sesión para añadir el producto al carrito',
              'Cerrar',
              { duration: 3000 }
            );
            console.error('Error al añadir el producto al carrito:', error);
          }
        );
    } else {
      this.snackBar.open(
        'Debe seleccionar una talla y una cantidad válida',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
