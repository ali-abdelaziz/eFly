import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = environment.api + 'products'
  products$: WritableSignal<Product[]> = signal<Product[]>([]);
  categories$: WritableSignal<string[]> = signal<string[]>([]);
  // allProducts$ = new BehaviorSubject<Product[]>([])
  search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getAllProducts(page = 1, limit = 5, search = '') {
    // caching data in local storage to avoid multiple requests
    const cachedProducts = localStorage.getItem('products');
    if (!cachedProducts) {
      console.log('No cached products found. Making a request...');
      let params = new HttpParams();
      if (page) params = params.append('page', page);
      if (limit) params = params.append('limit', limit);
      if (search) params = params.append('search', search);
      return this.http.get<Product[]>(this.api, { params })
      .pipe(
        tap((products) => {
          localStorage.setItem('products', JSON.stringify(products));
        })
      )
    } else {
      console.log('Using cached products...');
      return new BehaviorSubject<Product[]>(JSON.parse(cachedProducts));
    }
  }
  getCategories() {
    // caching data in local storage to avoid multiple requests
    const cachedCategories = localStorage.getItem('categories');
    if (!cachedCategories) {
      console.log('No cached categories found. Making a request...');
      return this.http.get<string[]>(this.api + '/categories')
      .pipe(
        tap((categories) => {
          localStorage.setItem('categories', JSON.stringify(categories));
        })
      )
    } else {
      console.log('Using cached categories...');
      return new BehaviorSubject<string[]>(JSON.parse(cachedCategories));
    }
  }

  getProductsByCategory(category: string) {
    // caching data in local storage to avoid multiple requests
    const cachedProductsByCategory = localStorage.getItem(category);
    if (!cachedProductsByCategory) {
      console.log('No cached products by category found. Making a request...');
      return this.http.get<Product[]>(this.api + '/category/' + category)
      .pipe(
        tap((products) => {
          localStorage.setItem(category, JSON.stringify(products));
        })
      )
    } else {
      console.log('Using cached products by category...');
      return new BehaviorSubject<Product[]>(JSON.parse(cachedProductsByCategory));
    }
    // return this.http.get<Product[]>(this.api + '/category/' + category);
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

  addToFavorite(product: Product) {
    this.products$.update(products => products.filter((p: Product) => p.id != product.id));
  }
}
