import {Component, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailModalComponent} from "../task-detail-modal/task-detail-modal.component";
import {Task} from "../models/task.model";
import {Status} from "../models/status.model";

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrl: './board-task.component.scss',
  standalone: false
})
export class BoardTaskComponent {
  @Input() task: Task | null = null;
  @Input() status: Status | null = null;



  constructor(private dialog: MatDialog) {
  }

  openTaskDetail() {
    console.log("Ouverture de la popup des détails");
    this.dialog.open(TaskDetailModalComponent);
  }
}
