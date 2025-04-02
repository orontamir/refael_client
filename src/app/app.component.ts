import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ShoppingCartComponent, OrderSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Refael';
}
