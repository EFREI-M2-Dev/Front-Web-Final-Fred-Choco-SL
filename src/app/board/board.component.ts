import {Component} from '@angular/core';
import {Project} from "../models/project.model";
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";

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


  constructor(private projectService: ProjectService, private advanceRoute: ActivatedRoute, private router: Router) {
    // get des projets de l'utilisateur


    const projectId = this.advanceRoute.snapshot.paramMap.get('projectId');
    if (projectId && !isNaN(+projectId)) {
      console.log('Récupération du projet avec l\'id:', projectId);
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
                this.router.navigate(['/projects']);
              },
              complete: () => {
                console.log('Récupération des projets terminée');
              }
            });
          }

        },
        error: (error) => {
          console.error('Erreur lors de la récupération du projet:', error);
        },
        complete: () => {
          console.log('Récupération du projet terminée');
        }
      });
    }
  }

}
