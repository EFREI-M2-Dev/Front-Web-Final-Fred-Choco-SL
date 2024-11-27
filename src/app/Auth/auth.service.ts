import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../login-page/login-page.component";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadAuthFromStorage();
  }

  // Load user and token from localStorage on app initialization
  private loadAuthFromStorage() {
    const token = localStorage.getItem('token');
    const userDisplayName = localStorage.getItem('userDisplayName');

    if (token && userDisplayName) {
      const [name, surname] = userDisplayName.split('&&');
      const user: User = { id: 0, email: '', name, surname, password: '', createdAt: '', updatedAt: '' };
      this.userSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  // Get the current user as an observable
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  // Get current authentication status
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Log in the user and store the token/user in memory and local storage
  login(token: string, user: User) {
    localStorage.setItem('token', token);
    const fullName = `${user.name}&&${user.surname}`;
    localStorage.setItem('userDisplayName', fullName);

    this.userSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  // Log out the user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDisplayName');

    this.userSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Get the current token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
