import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { TopNavigationComponent } from "../../shared/components/top-navigation/top-navigation.component";
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { SearchProductsService } from '../../services/search-products.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TopNavigationComponent, CommonModule, SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: WritableSignal<Product[]> = signal([]);

  constructor(
    private productsService: ProductsService,
    public productsSearchService: SearchProductsService
  ) {
    effect(() => {
      // console.log('test changes', productsSearchService.searchProducts());
      if (this.productsSearchService.searchProducts() !== '') {
        this.getAllProducts(this.productsSearchService.searchProducts())
      } else {
        this.getAllProducts()
      }
    });
  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(search = '') {
    this.productsService.getAllProducts(search).subscribe((data) => {
      this.productsService.products$.set(data);
      this.products.set(this.productsService.products$());
    })
  }

}
