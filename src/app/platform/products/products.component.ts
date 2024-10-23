import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { TopNavigationComponent } from "../../shared/components/top-navigation/top-navigation.component";
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { SearchProductsService } from '../../services/search-products.service';
import { SharedModule } from '../../shared/shared.module';
import { RolesService } from '../../auth/services/roles.service';
import { roleEnum } from '../../shared/roles/role.enum';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TopNavigationComponent, CommonModule, SharedModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: WritableSignal<Product[]> = signal([]);
  roleEnum = roleEnum;
  Categories: string[] = [];
  category!: string;
  sort!: string;
  defaultProduct : BehaviorSubject<any> = new BehaviorSubject('electronics');
  productsByCategory: Product[] = [];

  constructor(
    private productsService: ProductsService,
    public productsSearchService: SearchProductsService,
    public rolesService: RolesService,
  ) {
    effect(() => {
      // console.log('test changes', productsSearchService.searchProducts());
      if (this.productsSearchService.searchProducts() !== '') {
        this.getAllProducts(this.productsSearchService.searchProducts())
      } else {
        // this.getAllProducts()
      }
    });
  }
  ngOnInit(): void {
    this.getAllProducts()
    this.getCategories()
  }

  getAllProducts(search = '') {
    this.productsService.getAllProducts(search).subscribe((data) => {
      this.productsService.products$.set(data);
      this.products.set(this.productsService.products$());
    })
  }

  getCategories() {
    this.productsService.getCategories().subscribe((data) => {
      this.productsService.categories$.set(data);
      this.Categories = data;
    })
  }

  getProductsByCategory(category: string) {
    this.productsService.getProductsByCategory(category).subscribe((data) => {
      this.productsByCategory = data;
    })
  }

    // Clear filter data
    clearFilter() {
      this.category = "";
      this.sort = "";
      this.getAllProducts();
    }

}
