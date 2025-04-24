import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { TopNavigationComponent } from '../../../shared/components/top-navigation/top-navigation.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    TopNavigationComponent,
    PrimaryButtonComponent
  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  product: WritableSignal<Product> = signal<Product>({} as Product);
  isLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.spinnerService.show();
      this.isLoading = true;
      this.productsService.getProductById(productId).subscribe({
        next: (product) => {
          this.product.set(product);
          this.spinnerService.hide();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.spinnerService.hide();
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
