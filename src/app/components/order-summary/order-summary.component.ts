import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  taxRate: number = 0.1;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotal();
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }

  submitOrder(): void {
    const order: Order = {
      items: this.cartService.getItems().map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total
    };

    this.orderService.submitOrder(order).subscribe(
      response => {
        console.log('Order submitted successfully:', response);
        this.cartService.clearCart();
      },
      error => {
        console.error('Error submitting order:', error);
      }
    );
  }
}
