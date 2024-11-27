import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Project} from '../models/project.model';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: false
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project; // Le projet à afficher

  editForm!: FormGroup; // Formulaire réactif
  isEditing = false; // Indique si on est en mode édition
  @ViewChild('firstInput') firstInput!: ElementRef;

  constructor(
    private fb: FormBuilder, // FormBuilder pour créer les formulaires
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    // Initialiser le formulaire avec les données du projet
    this.editForm = this.fb.group({
      name: [this.project.name], // Champ nom
      description: [this.project.description], // Champ description
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
        this.project = project; // Mettre à jour avec les données actualisées du serveur
        this.isEditing = false; // Quitter le mode édition
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

}
