import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:80/api/Order/SubmitOrder';

  constructor(private http: HttpClient) { }

  submitOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
