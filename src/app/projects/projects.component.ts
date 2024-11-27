import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { ProjectService } from '../project.service';
import {Project} from "../models/project.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: false
})
export class ProjectsComponent {
  headerTopLine = 'Projects';
  projects: Project[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService
  ) {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        const capitalizedNames = user.name
          .split(' ')
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1));
        this.headerTopLine = `Bonjour ${capitalizedNames} ${user.surname.toUpperCase()}`;

        this.loadProjects();
      }
    });
  }

  loadProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      },
      complete: () => {
        console.log('Récupération des projets terminée');
      }
    });

  }
}
