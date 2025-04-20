import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebnavComponent } from './layout/sidenav/sidenav.component';
import { TranslateModule } from '@ngx-translate/core';
import { MainComponent } from './layout/main/main.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebnavComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class AdminModule { }
