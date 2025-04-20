import { Component, input, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  // imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidebnavComponent implements OnInit {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'products',
      icon: 'fa-solid fa-cubes',
      label: 'Products',
    },
    {
      routeLink: 'categories',
      icon: 'fa-solid fa-list',
      label: 'Categories',
    }
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  logout() {
  }

}
