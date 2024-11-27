import { Component } from '@angular/core';
import {AuthService} from "../Auth/auth.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: false
})
export class AvatarComponent {
  avatar: string = '';

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.avatar = `${user.name.charAt(0)}${user.surname.charAt(0)}`;
      }
    });
  }
}
