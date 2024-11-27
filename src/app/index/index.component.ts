import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: false
})
export class IndexComponent {
  constructor(private router: Router) {}

  async hanldeClick(event: Event, route: string) {
    await this.router.navigate([route]);
  }

}
