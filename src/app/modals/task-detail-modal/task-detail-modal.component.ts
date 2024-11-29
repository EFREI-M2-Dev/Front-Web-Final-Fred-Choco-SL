import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from '../../models/task.model';
import { Status } from "../../models/status.model";
import { ConfirmDeleteModalComponent } from "../confirm-delete-modal/confirm-delete-modal.component";
import { TaskService } from "../../services/task.service";
import { Project } from "../../models/project.model";
import { AuthService } from "../../Auth/auth.service";
import { User } from "../../pages/login-page/login-page.component";

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
  standalone: false
})
export class TaskDetailModalComponent {
  isEditing: boolean = false;
  editForm: FormGroup;
  assignee: Partial<User> | null = null;

  constructor(
    private dialogRef: MatDialogRef<TaskDetailModalComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,

    @Inject(MAT_DIALOG_DATA) public data: {
      currentTask: Task,
      statuses: Status[],
      currentProject: Project,
      memberAssignee: Partial<User> | null
    }
  ) {
    this.assignee = this.data.memberAssignee;
    this.editForm = this.formBuilder.group({
      name: [data.currentTask.name, [Validators.required, Validators.minLength(3)]],
      description: [data.currentTask.description],
      statusId: [data.currentTask.statusId, Validators.required] // Initialise avec l'ID du statut
    });

  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm.reset({
      name: this.data.currentTask.name,
      description: this.data.currentTask.description,
      statusId: this.data.currentTask.statusId
    });
  }

  saveChanges() {
    if (this.editForm.valid) {
      let updatedTask = this.editForm.value;
      updatedTask.statusId = Number(updatedTask.statusId);

      this.taskService.updateTask(this.data.currentProject.id, this.data.currentTask.id, updatedTask).subscribe({
        next: () => {
          this.isEditing = false;
          this.dialogRef.close("updated");
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la tâche:', err);
          if (err.error.message.includes("expired token")) this.authService.logout();
        }
      });
    }
  }

  deleteTask() {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(this.data.currentProject.id, this.data.currentTask.id).subscribe({
          next: () => {
            this.dialogRef.close("deleted");
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de la tâche:', err);
            if (err.error.message.includes("expired token")) this.authService.logout();
          },
        });
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  getStatusName(statusId: number): string {
    return this.data.statuses.find((stat: Status) => stat.id === Number(statusId))?.name || 'Unknown';
  }
}
