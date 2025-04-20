import { Component, input, OnInit, output } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

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
      label: 'sidenav.products',
    },
    {
      routeLink: 'categories',
      icon: 'fa-solid fa-list',
      label: 'sidenav.categories',
    }
  ];

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

}
