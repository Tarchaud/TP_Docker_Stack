import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
