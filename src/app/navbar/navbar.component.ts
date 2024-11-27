import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  @Input() isHomePage: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  handleLogout() {
    this.authService.logout();
  }

  async goToHome() {
    await this.router.navigate(['/']);
  }

  async goToLogin() {
    await this.router.navigate(['/login']);
  }

  async goToRegister() {
    await this.router.navigate(['/register']);
  }
}
