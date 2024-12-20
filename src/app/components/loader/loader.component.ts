import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false
})
export class LoaderComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
