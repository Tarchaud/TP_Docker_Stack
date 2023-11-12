import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskStatus } from './taskStatus.model';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor(private httpClient: HttpClient) { }

  getAllTaskStatuses(): Observable<TaskStatus[]> {
    return this.httpClient.get<TaskStatus[]>('http://localhost:80/api/tasksStatus/getAll');
  }

}
