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
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./loader/loader.component";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

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
    ProjectCardComponent
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
    MatIconModule
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
