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
import {AngularSvgIconModule, SvgIconComponent} from 'angular-svg-icon';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthInterceptor} from "./Auth/auth.interceptor";
import {AvatarComponent} from "./avatar/avatar.component";
import {HeaderComponent} from "./header/header.component";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {TabComponent} from "./tab/tab.component";
import {BoardComponent} from "./board/board.component";
import {BoardColumnComponent} from "./board-column/board-column.component";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./loader/loader.component";

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
    RegisterPageComponent,
    ProjectsComponent,
    IndexComponent,
    HeaderComponent,
    TabComponent,
    ProjectsComponent,
    BoardComponent,
    ProjectsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    SvgIconComponent,
    AngularSvgIconModule.forRoot(),
    ProjectCardComponent,
    ProjectCardComponent,
    MatTabsModule,
    MatIcon,
    ProjectCardComponent,
    BoardColumnComponent
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
