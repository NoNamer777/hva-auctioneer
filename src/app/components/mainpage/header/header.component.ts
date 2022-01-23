import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  date = (new Date()).toLocaleString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor() { }

  ngOnInit() {
  }

}
