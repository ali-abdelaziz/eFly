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
    public helper: HelperService
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
    this.productsService
      .getProductById(id)
      .pipe(
        tap((res) => {
          this.productForm.patchValue(res);
        })
      )
      .subscribe();
  }

  buildForm() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      // image: [''],
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
      this.productsService
        .AddProduct(this.productForm.value)
        .pipe(
          tap((res) => {
            this.snackBar.simpleSnackBar('common.addedSuccessfully');
            this.productForm.reset();
            this.productForm.updateValueAndValidity();
            this.helper.previousPage();
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
      // handel edit mode
    } else {
      this.productsService
        .updateProduct(this._id, this.productForm.value)
        .pipe(
          tap((res) => {
            this.snackBar.simpleSnackBar('common.updatedSuccessfully');
            this.productForm.reset();
            this.productForm.updateValueAndValidity();
            this.helper.previousPage();
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
    }
  }
}
