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
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagenatorService } from '../../shared/services/pagenator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from '../../auth/services/snackBar.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TopNavigationComponent, CommonModule, SharedModule, TranslateModule, FormsModule, RouterModule],
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
  searchKey:string = "";
  filterValue = "";
  pagenator$: any;
  isFavorite: boolean = false;

  constructor(
    private productsService: ProductsService,
    public productsSearchService: SearchProductsService,
    public rolesService: RolesService,
    private pagenatorService: PagenatorService,
    private spinnerService: NgxSpinnerService,
    private snackBar: SnackBarService,
  ) {
    this.pagenator$ = this.pagenatorService.pagenator$;
    // effect(() => {
    //   // console.log('test changes', productsSearchService.searchProducts());
    //   if (this.productsSearchService.searchProducts() !== '') {
    //     this.getAllProducts(this.productsSearchService.searchProducts())
    //   } else {
    //     // this.getAllProducts()
    //   }
    // });
  }
  ngOnInit(): void {
    this.getAllProducts(1, this.pagenator$.getValue().pageSize, this.filterValue)
    this.getCategories()
    this.productsService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  getAllProducts(pageIndex: number, pageSize: number, search: string = '') {
    this.spinnerService.show();
    this.productsService.getAllProducts(pageIndex, pageSize = 100,search).subscribe((data) => {
      this.productsService.products$.set(data);
      this.products.set(this.productsService.products$());
      this.productsByCategory = data;
    })
    this.spinnerService.hide();
  }

  getCategories() {
    this.spinnerService.show();
    this.productsService.getCategories().subscribe((data) => {
      this.productsService.categories$.set(data);
      this.Categories = data;
    })
    this.spinnerService.hide();
  }

  getProductsByCategory(category: string) {
    this.spinnerService.show();
    this.productsService.getProductsByCategory(category).subscribe((data) => {
      this.productsByCategory = data;
    })
    this.spinnerService.hide();
  }

  sortByPrice() {
    switch (this.sort) {
      case "low": {
        this.products.update(products => products.slice().sort((low, high) => low.price - high.price));
        this.productsByCategory.sort((low, high) => low.price - high.price);
        break;
      }
      case "high": {
        this.products.update(products => products.slice().sort((low, high) => high.price - low.price));
        this.productsByCategory.sort((low, high) => high.price - low.price);
        break;
      }
    }
  }
    // Clear filter data
    clearFilter() {
      this.spinnerService.show();
      // reset search input value
      this.searchKey = "";
      this.category = "";
      this.sort = "";
      this.getAllProducts(1, this.pagenator$.getValue().pageSize, this.filterValue)
      this.spinnerService.hide();
    }

    addToFavorite(product: Product) {
      this.productsService.products$.update(products => products.map(p => {
        if (p.id === product.id) {
          // p.isFavorite = !p.isFavorite;
          this.isFavorite = !this.isFavorite;
          this.snackBar.simpleSnackBar('common.commingSoon');
        }
        return p;
      }));
    }

}
