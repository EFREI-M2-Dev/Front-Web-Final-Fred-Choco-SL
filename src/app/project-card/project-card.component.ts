import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../models/project.model';
import {ProjectService} from '../project.service';
import {ConfirmDeleteModalComponent} from "../confirm-delete-modal/confirm-delete-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: false
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project; // Le projet à afficher
  @Output() projectDeleted = new EventEmitter<void>();

  editForm!: FormGroup; // Formulaire réactif
  isEditing = false; // Indique si on est en mode édition
  @ViewChild('firstInput') firstInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder, // FormBuilder pour créer les formulaires
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router
  ) {

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    // Initialiser le formulaire avec les données du projet
    this.editForm.setValue({
      name: this.project.name,
      description: this.project.description,
    });
  }

  // Passe en mode édition
  enableEdit() {
    this.isEditing = true;
    setTimeout(() => {
      if (this.firstInput) {
        this.firstInput.nativeElement.focus();
      }
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm.reset({
      name: this.project.name,
      description: this.project.description,
    });
  }

  reloadProject() {
    this.projectService.getProjectById(this.project.id).subscribe({
      next: (project) => {
        this.project = project;
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Erreur lors du rechargement du projet:', err);
      },
    });
  }


  // Enregistre les modifications
  saveChanges() {
    if (this.editForm.valid) {
      const updatedProject = this.editForm.value;

      this.projectService.updateProject(this.project.id, updatedProject).subscribe({
        next: () => {
          this.reloadProject(); // Recharge les données après une mise à jour réussie
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du projet:', err);
        },
      });
    }
  }

  deleteProject() {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur confirme, on appelle le service pour supprimer
        this.projectService.deleteProject(this.project.id).subscribe({
          next: () => {
            console.log('Projet supprimé avec succès');
            this.projectDeleted.emit();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du projet:', err);
          },
        });
      }
    });
  }

  async goToProject() {
    await this.router.navigate(['/board', this.project.id]);
  }

}
