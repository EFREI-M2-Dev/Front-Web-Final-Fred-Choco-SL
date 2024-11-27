import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent {
  @Input() headerTitle = 'Default Title';
  @Input() headerTopLine = 'Default Top Line';
}
