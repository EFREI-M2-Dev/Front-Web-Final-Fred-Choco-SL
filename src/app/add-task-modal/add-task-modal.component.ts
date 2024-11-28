import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Status} from "../models/status.model";
import {Project} from "../models/project.model";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  standalone:false
})
export class AddTaskModalComponent {
  addForm: FormGroup;
  status: Status;
  currentProject: Project;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskModalComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { status: Status; currentProject: Project }
  ) {
    // Initialisez vos valeurs à partir des données reçues
    this.status = data.status;
    this.currentProject = data.currentProject;

    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const newTask = {
        ...this.addForm.value,
        statusId: this.status.id
      };

      this.taskService.createTask(newTask, this.currentProject.id).subscribe((task) => {
        console.log('Task created:', task);
        this.dialogRef.close(task);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
