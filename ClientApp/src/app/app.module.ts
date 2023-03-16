import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {AddshortenComponent} from "./addshorten/addshorten.component";
import {ShortenComponent} from "./shorten/shorten.component";
import {ShortensComponent} from "./shortens/shortens.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import {AboutComponent} from "./about/about.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {RedirectComponent} from "./redirect/redirect.component";

export function tokenGetter(){
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    AddshortenComponent,
    RedirectComponent,
    ShortenComponent,
    ShortensComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'shortens', component: ShortensComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'add', component: AddshortenComponent, canActivate:[AuthGuard] },
      { path: 'shortens/:id', component: ShortenComponent, canActivate:[AuthGuard] },
      { path: 'about', component: AboutComponent, canActivate:[AuthGuard]  },
      { path: ':id', component: RedirectComponent, pathMatch: 'full' },
    ]),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7130"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
