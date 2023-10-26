import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks(id : string): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/api/tasks/getAllByProject/'+id);
  }

  updateTask(id: string, task: any): any {
    return this.httpClient.put('http://localhost:3000/api/tasks/update/'+id, task);
  }

  deleteTask(id: string): any {
    return this.httpClient.delete('http://localhost:3000/api/tasks/delete/' + id);
  }


  createTask(task: any): any {
    return this.httpClient.post('http://localhost:3000/api/tasks/add', task);
  }

}
