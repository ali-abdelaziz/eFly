import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  searchProducts: WritableSignal<string> = signal<string>('')
  constructor() { }
}
