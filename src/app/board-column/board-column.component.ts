import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../add-task-modal/add-task-modal.component";
import {Status} from "../models/status.model";
import {Project} from "../models/project.model";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
  standalone: false
})
export class BoardColumnComponent {
  @Input() status: Status | null = null;
  @Input() currentProject: Project | null = null;
  @Output() taskCreated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog
  ) {
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '500px',
      data: { status: this.status, currentProject: this.currentProject },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskCreated.emit();
        console.log('New task added:', result);
      }
    });
  }

  getMyTasksWithStatus() {
    return this.currentProject?.tasks.filter((task) => task.statusId === this.status?.id);
  }
}
