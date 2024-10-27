import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PrimaryButtonComponent, SearchInputComponent, RouterModule, CommonModule, SharedModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any;
  filterValue = ""
  constructor(
    private productsService: ProductsService
  ) {
    this.products = this.productsService.products$;
  }

  ngOnInit(): void {
    this.products.set([]);
    this.getAllProducts('');
  }

  getAllProducts(search = '') {
    this.productsService.getAllProducts(search).subscribe((data) => {
      this.productsService.products$.set(data);
      this.products = data;
    })
  }

  filterInputObservable(input: any) {
    this.filterValue = input
    this.getAllProducts(this.filterValue)
  }

}
