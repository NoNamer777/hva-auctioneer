import { Component, OnInit } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-http-interceptor',
  templateUrl: './http-interceptor.component.html'
})
export class HttpInterceptorComponent implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req);
  }

}
