import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedInSync();
    if (!isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/projects']);
      return false;
    }
  }
}
