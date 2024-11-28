import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth/auth.service";
import {Project} from "./models/project.model";
import {Observable} from "rxjs";
import {Task} from "./models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createTask(task: Task, projectId:number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/task`, task);
  }

  updateTask(projectId: number, taskId: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${projectId}/tasks/${taskId}`, task);
  }
}
