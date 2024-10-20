import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './auth/services/auth.service';
import { TopNavigationComponent } from './shared/components/top-navigation/top-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, TopNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    HttpClient
  ],
})
export class AppComponent implements OnInit {
  title = 'eFly';
  isAdmin: boolean = false

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    // this.authService.checkTokenValidaty()
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = event.url.includes('/admin/')
      }
      // if (event instanceof NavigationError) {
      //   console.log(event ,'error');

      // }
      // if (event instanceof NavigationCancel) {
      //   console.log(event ,'Cancel');

      // }
    });
  }

  ngOnInit(): void {
  }
}
