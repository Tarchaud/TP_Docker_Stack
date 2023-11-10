import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';


//Models
import { Project } from './project.model';

//Services
import { ProjectService } from './project.service';


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

  constructor(private projectService: ProjectService, private router : Router) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data: any) => {
        this.projects = data;
      },
      error: (err: any) => {
        Notify.failure(err.error.error);
      }
    });
  }

  createProject() {
    this.projectService.createProject(this.newProjectForm.value).subscribe({
      next: (data: any) => {
        Notify.success("Project created successfully");
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

  goToKanban(id : string){
    this.router.navigate(['/project/', id]);
  }


}
