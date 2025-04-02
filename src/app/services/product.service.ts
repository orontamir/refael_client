import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Oron TODO: need to be dynamic url (from configuration)
  private apiUrl = 'http://localhost:80/api/Product/GetAllProducts';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    var products = this.http.get<any>(this.apiUrl);
    console.log(products);
    return products;
  }
}
