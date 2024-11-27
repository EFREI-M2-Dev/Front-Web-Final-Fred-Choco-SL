import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-project-card',
  imports: [MatIconModule, MatFabButton],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  standalone: true
})
export class ProjectCardComponent {

}
