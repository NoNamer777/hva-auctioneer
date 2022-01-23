import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html'
})
export class NavBar2Component implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

}
