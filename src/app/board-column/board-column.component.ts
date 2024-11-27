import {Component, Input} from '@angular/core';
import {BoardTaskComponent} from "../board-task/board-task.component";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
    imports: [
        BoardTaskComponent
    ],
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input() title: string = 'Colonne de tâches';
}
