import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../add-task-modal/add-task-modal.component";
import {Status} from "../models/status.model";
import {Project} from "../models/project.model";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ProjectService} from "../project.service";
import {TaskService} from "../task.service";
import {Task} from "../models/task.model";

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
  @Input() connectedLists: string[] = []; // Pour connecter les colonnes


  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['connectedLists']) {
      console.log('connectedLists updated:', this.connectedLists);
    }
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

  getMyTasksWithStatus(): Task[] {
    return this.currentProject?.tasks.filter((task) => task.statusId === this.status?.id) || [];
  }


  onTaskDropped(event: CdkDragDrop<any[]>) {
    if (!this.status || !this.currentProject) return;

    const task = event.item.data;
    const newStatusId = this.status.id;

    if (task.statusId !== newStatusId) {
      this.taskService.updateTask(this.currentProject.id, task.id, { statusId: newStatusId }).subscribe({
        next: () => {
          console.log(`Task ${task.id} moved to status ${newStatusId}`);
          this.taskCreated.emit();
        },
        error: (err) => {
          console.error('Error updating task status:', err);
        },
      });
    }
  }
}
