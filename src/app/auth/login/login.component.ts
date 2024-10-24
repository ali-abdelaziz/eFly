import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomCheckBoxComponent } from '../../shared/components/custom-checkbox/custom-checkbox.component';
import { SnackBarService } from '../services/snackBar.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomCheckBoxComponent, TranslateModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackBarService
  ) { }
  ngOnInit(): void {
    this.buildForm();
  }

  getField = (field: string) => this.loginForm.get(field);

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['',  [Validators.required]],
      role: [''],
      // keepLogin: false
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.snackbarService.warningSnackBar('snackbar.validateyourformdata');
      return;
    }
    this.authService
    .login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe((res) => {
    console.log("loginForm:", this.loginForm.value);
    }, error => {
      if (error.status === 401) {
        this.snackbarService.backEndErrorSnackBar('Unauthorized Credentials');
        return;
      }
    });
  }

  checkBoxHandler(e: any, field: string) {
    this.loginForm.get(field)?.setValue(e.target.checked);
  }

}
