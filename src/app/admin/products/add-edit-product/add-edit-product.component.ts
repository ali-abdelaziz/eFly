import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SaveCancelButtonComponent } from '../../../shared/components/save-cancel-button/save-cancel-button.component';
import { ProductsService } from '../../../services/products.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../../auth/services/snackBar.service';
import { finalize, tap } from 'rxjs';
import { HelperService } from '../../../shared/services/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [TranslateModule, SaveCancelButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  isLoading: boolean = false;
  addMode: boolean = true;
  _id: any;
  productForm!: FormGroup;
  categories$: any[];

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    public helper: HelperService,
    private spinnerService: NgxSpinnerService
  ) {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categories$ = this.productsService.categories$();
  }
  ngOnInit(): void {
    this.buildForm();
    // if (this._id) {
    //   this.getProductById(this._id);
    // }
    this.getCategories();
    this.addMode = !this._id;
    if (!this.addMode) {
      this.getProductById(this._id);
    }
  }

  getProductById(id: string) {
    this.spinnerService.show();
    this.productsService
      .getProductById(id)
      .pipe(
        tap((res) => {
          this.productForm.patchValue(res);
        })
      )
      .subscribe();
    this.spinnerService.hide();
  }

  buildForm() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['https://i.pravatar.cc'],
      category: ['', [Validators.required]],
    });
  }

  getCategories() {
    this.productsService.getCategories().subscribe((data) => {
      this.productsService.categories$.set(data);
      this.categories$ = data;
    })
  }

  selectCategory(event: any) {
    this.productForm.get('category')?.setValue(event.target.value);
  }

  save() {
    if (this.productForm.invalid) {
      this.snackBar.warningSnackBar('snackbar.validateyourformdata');
      return;
    }
    this.isLoading = true;
    // handel add mode
    if (this.addMode) {
      this.spinnerService.show();
      this.productsService
        .AddProduct(this.productForm.value)
        .pipe(
          tap((res: any) => {
            this.snackBar.simpleSnackBar('common.addedSuccessfully');
            this.productForm.reset();
            this.productForm.updateValueAndValidity();
            this.helper.previousPage();
            // update product list
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(res => {
          this.productsService.products$.update((products) => [res, ...products]);
          // update local storage products and product list
          localStorage.setItem('products', JSON.stringify(this.productsService.products$()));
        })
        this.spinnerService.hide();
      // handel edit mode
    } else {
      this.spinnerService.show();
      this.productsService
        .updateProduct(this._id, this.productForm.value)
        .pipe(
          tap((res: any) => {
            this.snackBar.simpleSnackBar('common.updatedSuccessfully');
            this.productForm.reset();
            this.productForm.updateValueAndValidity();
            this.helper.previousPage();
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(res => {
          // update local storage products and product list
          this.productsService.products$.update((products) => [res, ...products]);
          localStorage.removeItem('products');
          localStorage.setItem('products', JSON.stringify(this.productsService.products$()));
        })
        this.spinnerService.hide();
    }
  }
}
