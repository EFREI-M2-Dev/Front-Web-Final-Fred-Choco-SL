import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BoardComponent} from "./board/board.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'board/:projectId',
    component: BoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
