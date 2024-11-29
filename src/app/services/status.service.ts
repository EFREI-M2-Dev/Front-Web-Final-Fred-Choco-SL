import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../models/status.model";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}/statuses`);
  }





}
