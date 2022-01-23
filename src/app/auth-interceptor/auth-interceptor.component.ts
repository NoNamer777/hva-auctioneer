import {Component, OnInit} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-auth-interceptor',
  templateUrl: './auth-interceptor.component.html'
})
export class AuthInterceptorComponent implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
    console.log('New HTTP Interceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();

    if (token) {
      req = req.clone({
        setParams: {auth: token}
      });
      console.log(req);
    }

    return next.handle(req);
  }

}
