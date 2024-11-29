import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../Auth/auth.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false
})
export class AvatarComponent implements OnInit {
  avatar: string = '';
  @Input() isSessionUser: boolean = false;
  @Input() name?: string;
  @Input() surname?: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.isSessionUser) {
      this.authService.getUser().subscribe(user => {
        if (user) {
          this.avatar = `${user.name.charAt(0)}${user.surname.charAt(0)}`;
        } else {
          throw new Error('User data is required for the current user!');
        }
      });
    } else {
      if (!this.name || !this.surname) {
        throw new Error('Name and surname are required when isCurrentUser is false!');
      }
      this.avatar = `${this.name.charAt(0)}${this.surname.charAt(0)}`;
    }
  }
}
