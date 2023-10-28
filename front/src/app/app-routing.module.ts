import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProjectListComponent } from './project-list/project-list.component';
import { KanbanTaskComponent } from './kanban-task/kanban-task.component';

const routes: Routes = [
  { path: 'kanban', component: KanbanTaskComponent, pathMatch: 'full'},
  { path: 'project/:id', component: KanbanTaskComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectListComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
