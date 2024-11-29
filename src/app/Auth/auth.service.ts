import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../pages/login-page/login-page.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.loadAuthFromStorage();
  }

  // Load user and token from localStorage on app initialization
  private loadAuthFromStorage() {
    const token = localStorage.getItem('token');
    const userDisplayName = localStorage.getItem('userDisplayName');

    if (token && userDisplayName) {
      const [name, surname] = userDisplayName.split('&&');
      const id = this.getUserIdFromToken();
      if(!id) {
        return;
      }
      const user: User = { id: id, email: '', name, surname, password: '', createdAt: '', updatedAt: '' };
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
  async login(token: string, user: User) {
    localStorage.setItem('token', token);
    const fullName = `${user.name}&&${user.surname}`;
    localStorage.setItem('userDisplayName', fullName);

    setTimeout(() => this.router.navigate(['/projects']))


    this.userSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  // Log out the user
  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDisplayName');

    setTimeout(() => this.router.navigate(['/']))

    this.userSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Get the current token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private parseJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload); // Décode la partie Base64
      return JSON.parse(decodedPayload); // Convertit le JSON string en objet
    } catch (error) {
      console.error('Error parsing JWT', error);
      return null;
    }
  }

  // Méthode pour obtenir l'ID utilisateur depuis le token
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwt(token);
      return payload?.id || null; // Remplacez 'id' par la clé exacte utilisée dans votre token
    }
    return null;
  }

  isLoggedInSync(): boolean {
    return this.isLoggedInSubject.value;
  }
}
