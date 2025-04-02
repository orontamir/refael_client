import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
    this.cartItemsSubject.next(this.cartItems);
  }

  updateQuantity(product: Product, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(product);
      } else {
        this.cartItemsSubject.next(this.cartItems);
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  getItems(): CartItem[] {
    return this.cartItems;
  }
}
