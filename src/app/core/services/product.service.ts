import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modals/product.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get("http://localhost:3000/api/product/getAll");
  }

  createProduct(newProduct: Product) {
    return this.http.post("http://localhost:3000/api/product/create", newProduct);
  }

  updateProduct(updateProduct: Product, id: string) {
    return this.http.patch("http://localhost:3000/api/product/update/"+ id, updateProduct);
  }

  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>("http://localhost:3000/api/product/getOne/"+ id);
  }

  deleteProduct(id: string) {
    return this.http.delete("http://localhost:3000/api/product/delete/"+ id);
  }

}
