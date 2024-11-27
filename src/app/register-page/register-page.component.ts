import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { addloginToStorage, User } from '../login-page/login-page.component';
import {AuthService} from "../Auth/auth.service";

interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false,
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  apiUrl = 'http://localhost:3000/api/register';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.registerForm = this.formBuilder.group(
      {
        surname: ['', [Validators.required, Validators.minLength(2)]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [this.passwordMatchValidator],
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { surname, name, email, password } = this.registerForm.value;

      this.http.post<RegisterResponse>(this.apiUrl, { surname, name, email, password }).subscribe({
        next: (response) => {
          const { token, user } = response;
          this.authService.login(token, user);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
}
