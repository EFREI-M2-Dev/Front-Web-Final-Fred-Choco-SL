import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {ButtonComponent} from "./components/button/button.component";
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IndexComponent} from "./pages/index/index.component";
import {AngularSvgIconModule} from 'angular-svg-icon';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {AuthInterceptor} from "./Auth/auth.interceptor";
import {AvatarComponent} from "./components/avatar/avatar.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ProjectCardComponent} from "./components/project/project-card/project-card.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {TabComponent} from "./components/tab/tab.component";
import {BoardComponent} from "./components/board/board/board.component";
import {BoardColumnComponent} from "./components/board/board-column/board-column.component";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./components/loader/loader.component";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ProjectAddModalComponent} from "./components/project/project-add-modal/project-add-modal.component";
import {BoardTaskComponent} from "./components/board/board-task/board-task.component";
import {ConfirmDeleteModalComponent} from "./modals/confirm-delete-modal/confirm-delete-modal.component";
import {AddTaskModalComponent} from "./modals/add-task-modal/add-task-modal.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TaskDetailModalComponent} from "./modals/task-detail-modal/task-detail-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    LoginPageComponent,
    IndexComponent,
    RegisterPageComponent,
    AvatarComponent,
    HeaderComponent,
    ProjectsComponent,
    TabComponent,
    LoaderComponent,
    ProjectCardComponent,
    BoardComponent,
    BoardColumnComponent,
    ProjectAddModalComponent,
    BoardTaskComponent,
    ConfirmDeleteModalComponent,
    AddTaskModalComponent,
    TaskDetailModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    MatTabsModule,
    MatIconModule,
    DragDropModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
