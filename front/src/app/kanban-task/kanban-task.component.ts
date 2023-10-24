import { Component } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrls: ['./kanban-task.component.css']
})
export class KanbanTaskComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.previousContainer);
      console.log(event.container.data);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer);
      console.log(event.container);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
