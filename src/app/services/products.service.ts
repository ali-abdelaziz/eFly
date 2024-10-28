import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = environment.api + 'products'
  products$: WritableSignal<Product[]> = signal<Product[]>([]);
  categories$: WritableSignal<string[]> = signal<string[]>([]);
  allProducts$ = new BehaviorSubject<Product[]>([])
  search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getAllProducts(page = 1, limit = 5, search = '') {
    let params = new HttpParams();
    if (page) params = params.append('page', page);
    if (limit) params = params.append('limit', limit);
    if (search) params = params.append('search', search);

    return this.http.get<Product[]>(this.api, { params })
  }

  getCategories() {
    return this.http.get<string[]>(this.api + '/categories');
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(this.api + '/category/' + category);
  }

  AddProduct(product: Product) {
    return this.http.post(this.api, product);
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.api + '/' + id);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(this.api + '/' + id, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.api + '/' + id);
  }
}
