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

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [TranslateModule, SaveCancelButtonComponent, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  isLoading: boolean = false;
  addMode: boolean = true;
  _id: any;
  productForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    public helper: HelperService,
    private spinnerService: NgxSpinnerService
  ) {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.buildForm();
    // if (this._id) {
    //   this.getProductById(this._id);
    // }
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
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['https://i.pravatar.cc'],
    });
  }

  save() {
    if (this.productForm.invalid) {
      this.snackBar.warningSnackBar('snackbar.validateyourformdata');
      return;
    }
    this.isLoading = true;
    // handel add mode
    if (this.addMode) {
      // handel add mode
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
            this.productsService.products$.update((products) => [res, ...products]);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
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
            // update product list
            this.productsService.products$.update((products) => {
              return products.map((product) => {
                if (product.id == this._id) {
                  return res;
                }
                return product;
              });
            }
            );
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
        this.spinnerService.hide();
    }
  }
}
