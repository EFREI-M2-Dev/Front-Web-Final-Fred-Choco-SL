import {Component, Input} from '@angular/core';
import {AuthService} from "../Auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent {
  @Input() headerTitle = 'Default Title';
  @Input() headerTopLine = 'Default Top Line';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    console.log('HeaderComponent constructor');
    this.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('Is Logged In:', isLoggedIn);
    });
  }
}
