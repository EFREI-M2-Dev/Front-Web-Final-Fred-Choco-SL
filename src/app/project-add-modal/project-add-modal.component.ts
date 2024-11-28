import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../project.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../Auth/auth.service";

@Component({
  selector: 'app-project-add-modal',
  templateUrl: './project-add-modal.component.html',
  styleUrl: './project-add-modal.component.scss',
  standalone:false
})
export class ProjectAddModalComponent {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ProjectAddModalComponent>
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const createdProject = this.addForm.value;

      this.projectService.createProject(createdProject).subscribe({
        next: () => {
          this.addForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du projet:', err);
          if (err.error.message.includes("expired token")) this.authService.logout();
        },
      });
    }
  }
}
