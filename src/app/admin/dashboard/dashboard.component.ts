import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  // imports: [HeaderComponent, SidebnavComponent, RouterOutlet, CommonModule, ProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);

  constructor(
    // inject the WINDOW token provided by the @angular/core module
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  ngOnInit(): void {
    // resolve issue window is not defined as we're running our application in an (SSR) environment
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth.set(window.innerWidth);
    }
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  @HostListener('window:resize')
  onResize() {
    // resolve issue window is not defined as we're running our application in an (SSR) environment
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }
  }


  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

}
