import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html'
})
export class SignOnComponent implements OnInit {
  email: string;
  password: string;
  returnString: string;

  constructor(private sessionService: SessionService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnString = params.return || '/');
  }

  login() {
    this.sessionService.signOn(this.email, this.password)
      .then(data => this.router.navigateByUrl(this.returnString))
      .catch(error => console.log('Auth error:', error));
  }
}
