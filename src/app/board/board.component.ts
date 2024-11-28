import {Component} from '@angular/core';
import {Project} from "../models/project.model";
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../models/status.model";
import {StatusService} from "../status.service";
import {AuthService} from "../Auth/auth.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: false
})
export class BoardComponent {
  headerTitle = 'Project';
  headerTopLine = 'Projects';
  currentProject: Project | null = null;
  statuses: Status[] = [];

  constructor(
    private projectService: ProjectService,
    private statusService: StatusService,
    private advanceRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    const projectId = this.advanceRoute.snapshot.paramMap.get('projectId');
    if (projectId && !isNaN(+projectId)) {
      this.projectService.getProjectById(+projectId).subscribe({
        next: (project) => {
          if (!project) {
            console.error('Projet introuvable');
            this.router.navigate(['/projects']);
          } else {
            this.projectService.getUserProjects().subscribe({
              next: (myProjects) => {
                if (!myProjects.find((p) => p.id === project.id)) {
                  console.error('Le projet demandé n\'appartient pas à l\'utilisateur');
                  this.router.navigate(['/projects']);

                } else {
                  this.currentProject = project;

                  console.log('Projet récupéré:', project);

                  const projectDate = new Date(project.createdAt);
                  this.headerTitle = project.name;
                  this.headerTopLine = "Créer le : " + projectDate.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                }
              },
              error: (error) => {
                if (error.message.includes("expired token")) {
                  this.authService.logout();
                } else {
                  this.router.navigate(['/projects']);

                }
              },
              complete: () => {
                console.log('Récupération des projets terminée');
              }
            });
          }

        },
        error: (error) => {
          console.error('Erreur lors de la récupération du projet:', error);
          if (error.message.includes("expired token")) this.authService.logout();
        },
        complete: () => {
          console.log('Récupération du projet terminée');
        }
      });
    }

    this.statusService.getStatuses().subscribe({
      next: (statuses) => {
        this.statuses = statuses;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statuts:', error);
        if (error.message.includes("expired token")) this.authService.logout();
      },
      complete: () => {
        console.log('Récupération des statuts terminée');
      }
    });
  }


  reloadProject() {
    if(!this.currentProject) return;
    this.projectService.getProjectById(this.currentProject.id).subscribe({
      next: (project) => {
        this.currentProject = project;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
        if (error.message.includes("expired token")) this.authService.logout();
      },
      complete: () => {
        console.log('Récupération des tâches terminée');
      }
    });
  }
}


