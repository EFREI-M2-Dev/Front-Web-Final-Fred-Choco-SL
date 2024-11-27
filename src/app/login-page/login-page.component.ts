import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: false
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialisation du formulaire avec FormBuilder
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Champ requis pour le nom d'utilisateur
      password: ['', [Validators.required, Validators.minLength(6)]] // Champ requis pour le mot de passe avec minLength
    });
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
