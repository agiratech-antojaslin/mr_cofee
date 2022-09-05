import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modals/category.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get("http://localhost:3000/api/category/getAll");
  }

  createCategory(newCategory: Category) {
    return this.http.post("http://localhost:3000/api/category/createCategory", newCategory);
  }

  updateCategory(newCategory: Category, id: string) {
    return this.http.patch("http://localhost:3000/api/category/update/"+ id, newCategory);
  }

  getSingleCategory(id: string): Observable<Category> {
    return this.http.get<Category>("http://localhost:3000/api/category/getOne/"+ id);
  }

  deleteCategory(id: string) {
    return this.http.delete("http://localhost:3000/api/category/delete/"+ id);
  }

}
