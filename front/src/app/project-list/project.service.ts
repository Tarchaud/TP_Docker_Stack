import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private httpClient: HttpClient) { }


  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/api/projects/getAll');
  }

}
