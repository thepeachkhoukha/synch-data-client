import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  rootURL= 'http://localhost:3000/products'
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.rootURL);
  }

  addProduct(product: Product) {
    return this.http.post(this.rootURL, {product})
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.rootURL, {body: product});
  }
}
