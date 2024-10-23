import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = environment.api + 'products'
  products$: WritableSignal<Product[]> = signal<Product[]>([]);
  categories$: WritableSignal<string[]> = signal<string[]>([]);

  constructor(private http: HttpClient) { }

  getAllProducts(search = '', isAdmin: boolean = false) {
    let params = new HttpParams()
    if (search) params = params.append('search', search)

    return this.http.get<Product[]>(this.api, { params })
  }

  getCategories() {
    return this.http.get<string[]>(this.api + '/categories');
  }
}
