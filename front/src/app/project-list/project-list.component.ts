import { Component } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  projects: Project[] = [];
  newProjectForm: FormGroup = new FormGroup({
    title :new FormControl('', [Validators.required]),
  });

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data: any) => {
        console.log(data); //TODO : remove
        this.projects = data;
        console.log(this.projects); //TODO : remove
      },
      error: (err: any) => {
        Notify.failure(err.error.error);
      }
    });
  }

  createProject() {
    this.projectService.createProject(this.newProjectForm.value).subscribe({
      next: (data: any) => {
        Notify.success(data.message);
        this.newProjectForm.reset();
        this.ngOnInit();
      },
      error: (err: any) => {
        Notify.failure(err.error.error);
      }
    });
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe({
      next : (data: any) => {
        Notify.success(data.message);
        this.ngOnInit();
      },
      error: (err: any) => {
        Notify.failure(err.error.error);
      }
    });
  }


}
