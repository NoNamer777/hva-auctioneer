import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/mainpage/header/header.component';
import {HomeComponent} from './components/mainpage/home/home.component';
import {NavBarComponent} from './components/mainpage/nav-bar/nav-bar.component';
import {Overview1Component} from './components/offers/overview1/overview1.component';
import {Overview2Component} from './components/offers/overview2/overview2.component';
import {Detail2Component} from './components/offers/detail2/detail2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnumToArrayPipe} from './enumToArray.pipe';
import {Overview3Component} from './components/offers/overview3/overview3.component';
import {Detail3Component} from './components/offers/detail3/detail3.component';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './components/mainpage/error/error.component';
import {Detail4Component} from './components/offers/detail4/detail4.component';
import {Overview4Component} from './components/offers/overview4/overview4.component';
import {Detail41Component} from './components/offers/detail41/detail41.component';
import {CanDeactivateGuardService} from './services/can-deactivate-guard.service';
import {Overview5Component} from './components/offers/overview5/overview5.component';
import {Detail5Component} from './components/offers/detail5/detail5.component';
import {Detail42Component} from './components/offers/detail42/detail42.component';
import {Overview6Component} from './components/offers/overview6/overview6.component';
import {Detail6Component} from './components/offers/detail6/detail6.component';
import {FbComponent} from './fb/fb.component';
import { Header2Component } from './components/mainpage/header2/header2.component';
import { SignOnComponent } from './components/mainpage/sign-on/sign-on.component';
import { NavBar2Component } from './components/mainpage/nav-bar2/nav-bar2.component';
import { AuthInterceptorComponent } from './auth-interceptor/auth-interceptor.component';
import { Overview11Component } from './components/offers2/overview11/overview11.component';
import { Detail11Component } from './components/offers2/detail11/detail11.component';
import { HttpInterceptorComponent } from './http-interceptor/http-interceptor.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: SignOnComponent},
  {path: 'offers/overview1', component: Overview1Component},
  {path: 'offers/overview2', component: Overview2Component},
  {path: 'offers/overview3', component: Overview3Component},
  {
    path: 'offers/overview4', component: Overview4Component,
    children: [{path: 'edit', component: Detail4Component}]
  },
  {
    path: 'offers/overview41', component: Overview4Component,
    children: [{path: 'edit', component: Detail41Component, canDeactivate: [CanDeactivateGuardService]}]
  },
  {
    path: 'offers/overview42', component: Overview4Component,
    children: [{path: 'edit', component: Detail42Component, canDeactivate: [CanDeactivateGuardService]}]
  },
  {
    path: 'offers/overview5', component: Overview5Component,
    children: [
      {path: ':id', component: Detail5Component},
      {path: '', redirectTo: '/offers/overview5/-1', pathMatch: 'full'}
    ]
  },
  {
    path: 'offers/overview6', component: Overview6Component,
    children: [{path: 'edit', component: Detail6Component, canDeactivate: [CanDeactivateGuardService]}]
  },
  {
    path: 'offers/overview11', component: Overview11Component,
    children: [{path: 'edit', component: Detail11Component, canDeactivate: [CanDeactivateGuardService]}]
  },
  {path: '**', component: ErrorComponent}
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Detail2Component,
    EnumToArrayPipe,
    Overview3Component,
    Detail3Component,
    ErrorComponent,
    Detail4Component,
    Overview4Component,
    Detail41Component,
    Overview5Component,
    Detail5Component,
    Detail42Component,
    Overview6Component,
    Detail6Component,
    FbComponent,
    Header2Component,
    SignOnComponent,
    NavBar2Component,
    AuthInterceptorComponent,
    Overview11Component,
    Detail11Component,
    HttpInterceptorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorComponent, multi: true}
  ],
  bootstrap: [FbComponent]
})
export class AppModule {
}
