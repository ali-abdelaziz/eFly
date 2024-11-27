import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomCheckBoxComponent } from '../../shared/components/custom-checkbox/custom-checkbox.component';
import { SnackBarService } from '../services/snackBar.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackBarService,
    private spinnerService: NgxSpinnerService,
    private rolesService: RolesService
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  getField = (field: string) => this.loginForm.get(field);

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    // check if form is invalid
    if (this.loginForm.invalid) {
      this.snackbarService.warningSnackBar('snackbar.validateyourformdata');
      return;
    }
    this.spinnerService.show();
    // check if user is admin
    if (
      this.loginForm.value.username === 'admin' &&
      this.loginForm.value.password === 'admin' &&
      this.rolesService.getRole().includes('admin')
    ) {
      this.loginForm.setValue({
        username: 'mor_2314',
        password: '83r5^_',
      });
      // checkk if user is normal user
    } else if (
      this.loginForm.value.username === 'user' &&
      this.loginForm.value.password === 'user' &&
      this.rolesService.getRole().includes('user')
    ) {
      this.loginForm.setValue({
        username: 'mor_2314',
        password: '83r5^_',
      });
        // Otherwise show error message
    } else {
      this.spinnerService.show();
      this.snackbarService.warningSnackBar(
        'snackbar.checkCredentials'
      );
      this.spinnerService.hide();
      return;
    }
    this.authService
    .login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe((res) => {
        this.router.navigate(['/products']);
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        this.snackbarService.backEndErrorSnackBar(
          'snackbar.unauthorizedCredentials'
        );
    });
  }

  checkBoxHandler(e: any, field: string) {
    this.loginForm.get(field)?.setValue(e.target.checked);
  }

}
