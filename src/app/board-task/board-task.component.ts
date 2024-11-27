import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailModalComponent} from "../task-detail-modal/task-detail-modal.component";

@Component({
  selector: 'app-board-task',
  imports: [],
  templateUrl: './board-task.component.html',
  styleUrl: './board-task.component.scss'
})
export class BoardTaskComponent {

  constructor(private dialog: MatDialog) {
  }

  openTaskDetail() {
    console.log("Ouverture de la popup des détails");
    this.dialog.open(TaskDetailModalComponent);
  }
}
