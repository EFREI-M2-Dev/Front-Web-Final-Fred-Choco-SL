import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from "./models/project.model";
import {AuthService} from "./Auth/auth.service";
import {switchMap, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserProjects(): Observable<Project[]> {
    return this.authService.getUser().pipe(
      filter(user => user !== null),
      switchMap(user => {
        return this.http.get<Project[]>(`${this.apiUrl}/${user!.id}/projects`);
      })
    );
  }

  updateProject(projectId: number, updates: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${projectId}`, updates);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

}
