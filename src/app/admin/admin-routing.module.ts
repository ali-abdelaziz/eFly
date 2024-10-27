import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Products
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent
          },
          // {
          //   path: 'view/:id',
          //   component: ViewProductComponent
          // },
          {
            path: 'add',
            component: AddEditProductComponent
          },
          {
            path: 'edit/:id',
            component: AddEditProductComponent
          },
        ]
      },
      // Categories
      // {
      //   path: 'categories',
      //   children: [
      //     {
      //       path: '',
      //       component: CategoriesComponent
      //     },
      //     {
      //       path: 'view/:id',
      //       component: ViewCategoryComponent
      //     },
      //     {
      //       path: 'add',
      //       component: AddEditCategoryComponent
      //     },
      //     {
      //       path: 'edit/:id',
      //       component: AddEditCategoryComponent
      //     },
      //   ]
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
