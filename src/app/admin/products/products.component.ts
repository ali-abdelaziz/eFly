import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { PagenatorService } from '../../shared/services/pagenator.service';
import { CustomPaginatorComponent } from '../../shared/components/custom-paginator/custom-paginator.component';
import { Product } from '../../models/product.model';
import { SnackBarService } from '../../auth/services/snackBar.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PrimaryButtonComponent, SearchInputComponent, CustomPaginatorComponent, RouterModule, CommonModule, SharedModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any;
  allProducts: any;
  selectedProduct: WritableSignal<Product> = signal<Product>({} as Product);
  _id: any;
  filterValue = "";
  pagenator$: any;
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  _unsubscribe$: Subject<boolean> = new Subject();
  constructor(
    public productsService: ProductsService,
    private pagenatorService: PagenatorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
  ) {
    this.products = this.productsService.products$;
    this.allProducts = this.productsService.allProducts$;
    this.pagenator$ = this.pagenatorService.pagenator$;
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.productsService.products$.set([]);
    this.allProducts.next([]);
    this.pagenatorService.resetPagenator();
    this.getAllProducts(1, this.pagenator$.getValue().limit = 20, this.filterValue);
  }

  getAllProducts(page: number, limit: number, search: string ) {
    this.productsService.getAllProducts(page, limit, search)
    .pipe(
      tap((data: any) => {
        if (page == 1)
        // this.products.set([]);
        // this.products.set(data);
        this.allProducts.next(data);
        this.productsService.products$.set([]);
        this.productsService.products$.set(data);
        this.products = data;
          this.pagenatorService.updatePagenatorLenth(data.totalDocs)
          this.pagenatorService.updatePagenatorTotalPages(data.totalPages)
      }),
      finalize(() => this.isLoading = false),
      takeUntil(this._unsubscribe$),
    )
    .subscribe();
  }
  filterInputObservable(input: any) {
    this.filterValue = input;
    this.getAllProducts(1, this.pagenator$.getValue().pageSize, this.filterValue)
  }

  reStoreProductsAfterSearched() {
    this.filterValue = ''
    this.pagenatorService.resetPagenator()
    this.getAllProducts(1, this.pagenator$.getValue().pageSize, this.filterValue);
  }

  pagenateChange(event: any) {
    // this.products.set([]);
    this.allProducts.next([]);
    this.productsService.products$.set([]);
    this.pagenator$.next({
      ...this.pagenator$.getValue(),
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      previousPageIndex: event.previousPageIndex,
    })
    this.getAllProducts(this.pagenator$.getValue().pageIndex + 1, this.pagenator$.getValue().pageSize, this.filterValue)
  }

  showModal(product: Product) {
    console.log("product",product);
    this.selectedProduct.set(product)


    this.isModalOpen = !this.isModalOpen;
  }

  onDeleteProduct(id: any) {
    this.showModal(id);
    this.productsService.deleteProduct(id)
    .subscribe();
    this.isModalOpen = false;
    this.snackBar.simpleSnackBar('common.deletedSuccessfully');
    this.selectedProduct.set({} as Product);
    this.productsService.products$.set([]);
    this.allProducts.next([]);
    this.getAllProducts(1, this.pagenator$.getValue().limit = 20, this.filterValue);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}
