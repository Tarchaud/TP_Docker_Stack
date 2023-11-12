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
    return this.httpClient.get<Project[]>('http://localhost:80/api/projects/getAll');
  }

  createProject(project: any): any {
    return this.httpClient.post('http://localhost:80/api/projects/add', project);
  }

  deleteProject(id: string): any {
    return this.httpClient.delete('http://localhost:80/api/projects/delete/' + id);
  }


}
