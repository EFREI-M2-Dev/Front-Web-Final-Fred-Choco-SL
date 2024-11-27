import {Component} from '@angular/core';
import {AuthService} from "../Auth/auth.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: false
})
export class ProjectsComponent {
  headerTopLine = 'Projects';
  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      if (user) {
        const capitalizedNames = user.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1));
        this.headerTopLine = `Bonjour ${capitalizedNames} ${user.surname.toUpperCase()}`;
      }
    });
  }
}
