import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { SidebnavComponent } from '../layout/sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebnavComponent, RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible: any) => {
      // console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }

}
