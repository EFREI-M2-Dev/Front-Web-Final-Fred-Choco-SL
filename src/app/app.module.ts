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
import { TabsComponent } from './tabs/tabs.component';
import {MatTabsModule} from "@angular/material/tabs";

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
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    SvgIconComponent,
    AngularSvgIconModule.forRoot(),
    ProjectCardComponent,
    MatTabsModule
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
