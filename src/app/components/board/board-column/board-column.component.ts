import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../../../modals/add-task-modal/add-task-modal.component";
import {Status} from "../../../models/status.model";
import {Project} from "../../../models/project.model";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ProjectService} from "../../../services/project.service";
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../models/task.model";
import {AuthService} from "../../../Auth/auth.service";

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
  @Output() taskUpdated = new EventEmitter<void>();
  @Input() connectedLists: string[] = []; // Pour connecter les colonnes
  @Input() statuses: Status[] = [];


  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private projectService: ProjectService,
    private authService: AuthService
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
      data: {status: this.status, currentProject: this.currentProject},
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
      this.taskService.updateTask(this.currentProject.id, task.id, {statusId: newStatusId}).subscribe({
        next: () => {
          console.log(`Task ${task.id} moved to status ${newStatusId}`);
          this.taskCreated.emit();
        },
        error: (err) => {
          console.error('Error updating task status:', err);
          if (err.error.message.includes("expired token")) this.authService.logout();
        },
      });
    }
  }

  reloadLocalTasks() {
    if (!this.currentProject) return;
    this.projectService.getProjectById(this.currentProject.id).subscribe({
      next: (project) => {
        this.currentProject = project;
      },
      error: (err) => {
        console.error('Error reloading tasks:', err);
        if (err.error.message.includes("expired token")) this.authService.logout();
      },
    });
  }

  reloadAllTasks() {
    this.taskUpdated.emit();
  }
}
