import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private taskService: TaskService, private taskStatusService: TaskStatusService, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id') || "";
      console.log(this.projectId);
    });

    this.taskStatusService.getAllTaskStatuses().subscribe({
      next: (data: any) => {
        this.TaskStatuses = data;
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
    // console.log("data previous",event.previousContainer.data[event.previousIndex])
    // console.log("data next",event.container.data)
    // console.log("data previous inder",event.previousIndex)
    // console.log("data current index",event.previousIndex)
    // console.log("data current index",event.item)
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
}
