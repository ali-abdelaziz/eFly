import { Component } from '@angular/core';
import { TopNavigationComponent } from "../../shared/components/top-navigation/top-navigation.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TopNavigationComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {




  getAllProducts() {
  }

}
