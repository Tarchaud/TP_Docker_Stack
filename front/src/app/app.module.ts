//module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

//service
import { ProjectService } from './project-list/project.service';
import { TaskService } from './kanban-task/task.service';
import { TaskStatusService } from './kanban-task/task-status.service';

//components
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { KanbanTaskComponent } from './kanban-task/kanban-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    KanbanTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProjectService,
    TaskService,
    TaskStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
