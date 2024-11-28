import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailModalComponent} from "../task-detail-modal/task-detail-modal.component";
import {Task} from "../models/task.model";
import {Status} from "../models/status.model";
import {Project} from "../models/project.model";
import {ConfirmDeleteModalComponent} from "../confirm-delete-modal/confirm-delete-modal.component";
import {TaskService} from "../task.service";
import {AuthService} from "../Auth/auth.service";
import {User} from "../login-page/login-page.component";

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrl: './board-task.component.scss',
  standalone: false
})
export class BoardTaskComponent {
  @Input() task: Task | null = null;
  @Input() currentProject: Project | null = null;
  @Input() status: Status | null = null;
  @Input() statuses: Status[] = [];
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  memberAssignee: Partial<User> | null = null;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.currentProject || !this.task) {
      console.error("Impossible de charger la tâche");
      return;
    }

    this.taskService.getTaskById(this.currentProject.id, this.task.id).subscribe({
      next: (task) => {
        this.memberAssignee = task.assignee;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la tâche:', err);
        if (err.error.message.includes("expired token")) this.authService.logout();
      }
    });
  }

  openTaskDetail() {
    console.log("Ouverture de la popup des détails");
    const dialogRef = this.dialog.open(TaskDetailModalComponent, {
      width: '600px',
      data: {
        currentProject: this.currentProject,
        currentTask: this.task,
        statuses: this.statuses,
        memberAssignee: this.memberAssignee
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "deleted") {
        console.log('Task supprimé avec succès');
        dialogRef.close();
        this.taskDeleted.emit();
      } else if (result === "updated") {
        console.log('Task mise à jour avec succès');
        dialogRef.close();
        this.taskUpdated.emit();
      }
    });

  }
}
