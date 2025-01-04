import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  product: Product = new Product(0, '', '', 0, '', 0);

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        console.log('Product created successfully', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    );
  }
}
