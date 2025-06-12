import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  error = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['samuel.michaux@ik.me', [Validators.required, Validators.email]],
      password: ['Sam12345$', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('ok');
        },
        error: (e: Error) => {
          this.error = e.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
