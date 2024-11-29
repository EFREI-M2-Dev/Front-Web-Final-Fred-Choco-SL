import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {BoardComponent} from './pages/board/board.component';
import {GuestGuard} from "./Auth/guest.guard";
import {AuthenticatedGuard} from "./Auth/authenticated.guard";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'board/:projectId',
    component: BoardComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
