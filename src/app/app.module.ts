import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {ButtonComponent} from "./button/button.component";
import {NavbarComponent} from './navbar/navbar.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IndexComponent} from "./index/index.component";
import {AngularSvgIconModule} from 'angular-svg-icon';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthInterceptor} from "./Auth/auth.interceptor";
import {AvatarComponent} from "./avatar/avatar.component";
import {HeaderComponent} from "./header/header.component";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {TabComponent} from "./tab/tab.component";
import {BoardComponent} from "./board/board.component";
import {BoardColumnComponent} from "./board-column/board-column.component";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./loader/loader.component";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ProjectAddModalComponent} from "./project-add-modal/project-add-modal.component";
import {BoardTaskComponent} from "./board-task/board-task.component";
import {ConfirmDeleteModalComponent} from "./confirm-delete-modal/confirm-delete-modal.component";
import {AddTaskModalComponent} from "./add-task-modal/add-task-modal.component";
import {DragDropModule} from "@angular/cdk/drag-drop";

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
    AddTaskModalComponent
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
    DragDropModule
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
