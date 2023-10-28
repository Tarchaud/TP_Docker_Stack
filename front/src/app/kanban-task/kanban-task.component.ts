import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


//Models
import { Task } from './task.model';
import { TaskStatus } from './taskStatus.model';

//Services
import { TaskService } from './task.service';
import { TaskStatusService } from './task-status.service';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

interface TaskMap {
  [key: string]: Task[]; // Clé (ID de la tâche) : Valeur (État de la tâche)
}

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrls: ['./kanban-task.component.css']
})
export class KanbanTaskComponent {
  Tasks: TaskMap = {};
  TaskStatuses: TaskStatus[] = [];
  projectId : string = "";
  selectedStatus : string = "";


  newTaskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
  });

  constructor(private taskService: TaskService, private taskStatusService: TaskStatusService, private activeRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id') || "";
      this.newTaskForm.get('project')?.setValue(this.projectId);
    });

    this.taskStatusService.getAllTaskStatuses().subscribe({
      next: (data: any) => {
        this.TaskStatuses = data;
        this.newTaskForm.get('status')?.setValue(this.TaskStatuses[0]._id);
      },
      error: (err: any)  => {
        Notify.failure(err.error.error);
      }
    });

    this.taskService.getAllTasks(this.projectId).subscribe({
      next: (data: any) => {
        this.Tasks = {};
        data.forEach((task : Task) => {
          if (!this.Tasks[task.status]) {
            this.Tasks[task.status] = [];
          }
          this.Tasks[task.status].push(task);
        });
      },
      error: (err: any)  => {
        Notify.failure(err.error.error);
      }
    });
  }


  changeStatus(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer != event.container) {
      let id = event.previousContainer.data[event.previousIndex]._id;
      let updateTask = event.previousContainer.data[event.previousIndex];
      updateTask.status = event.container.id;
      this.taskService.updateTask(id, updateTask).subscribe({
        next: (data: any) => {
          Notify.success(data.message);
          this.ngOnInit();
        },
        error: (err: any)  => {
          Notify.failure(err.error.error);
        }
      });
    }
  }

  createTask() {
    if (this.newTaskForm.valid) {
      this.taskService.createTask(this.newTaskForm.value).subscribe({
        next: (data: any) => {
          Notify.success("Task created successfully");
          this.newTaskForm.reset();
          this.ngOnInit();
        },
        error: (err: any)  => {
          Notify.failure(err.error.error);
        }
      });
    }
  }

  deleteTask(taskId : string){
    this.taskService.deleteTask(taskId).subscribe({
      next: (data: any) => {
        Notify.success(data.message);
        this.ngOnInit();
      },
      error: (err: any)  => {
        Notify.failure(err.error.error);
      }
    });
  }

  goToProjects(){
    this.router.navigate(['/projects']);
  }

}
