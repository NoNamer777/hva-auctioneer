import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html'
})
export class Header2Component implements OnInit {
  date = (new Date()).toLocaleString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

}
