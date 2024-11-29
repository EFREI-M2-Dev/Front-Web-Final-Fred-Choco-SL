import {Component} from '@angular/core';
import {LoaderService} from "./services/loader.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'Todoum';

  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.loaderService.hide();
        }, 200);
      }
    });
  }


  // constructor(private loaderService: LoaderService) {
  //   setTimeout(() => this.loaderService.show(), 1000); // Affiche le loader après 1 seconde
  //   setTimeout(() => this.loaderService.hide(), 3000); // Cache le loader après 3 secondes
  // }
}
