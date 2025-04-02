import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      console.log('API response:', products.result);
      this.products = products.result;
      this.filteredProducts = products.result;
      this.categories = [...new Set(this.products.map(p => p.category))];
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
