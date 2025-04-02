import { OrderItem } from "./OrderItem.model";

export interface Order {
  orderId?: number;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}
