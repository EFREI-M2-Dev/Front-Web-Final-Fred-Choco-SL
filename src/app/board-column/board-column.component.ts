import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input() title: string = 'Colonne de tâches';
}
