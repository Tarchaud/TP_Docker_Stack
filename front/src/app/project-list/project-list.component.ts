import { Component } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  projects: Project[] = [];

  constructor(private projectService: ProjectService, private http : HttpClient) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data: any) => {
      console.log(data);
      this.projects = data;
      console.log(this.projects);
    })
  }
}
