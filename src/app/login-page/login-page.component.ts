import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../Auth/auth.service";

export interface User {
  id: number,
  email: string,
  name: string,
  surname: string,
  password: string,
  createdAt: string,
  updatedAt: string
}

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  apiUrl = 'http://localhost:3000/api/login';


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {
    // Initialisation du formulaire avec FormBuilder
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Champ requis pour l'email avec email
      password: ['', [Validators.required, Validators.minLength(6)]] // Champ requis pour le mot de passe avec minLength
    });
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.post<LoginResponse>(this.apiUrl, { email, password }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          const { token, user } = response;
          this.authService.login(token, user);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}

export const addloginToStorage = (token: string, user: User) => {
  const fullName = `${user.name} ${user.surname}`;
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('userDisplayName', fullName);
}
