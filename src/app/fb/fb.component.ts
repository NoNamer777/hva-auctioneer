import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './fb.component.html'
})
export class FbComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAS7jlCt-mXGXxJhtSJ5L3Xo1VWdfUZK3E',
      authDomain: 'webf-auctioneer-is204-1.firebaseapp.com',
      databaseURL: 'https://webf-auctioneer-is204-1.firebaseio.com',
      projectId: 'webf-auctioneer-is204-1',
      storageBucket: 'webf-auctioneer-is204-1.appspot.com',
      messagingSenderId: '374500437427',
      appId: '1:374500437427:web:26a794aba25c3b8558efc6'
    };

    firebase.initializeApp(firebaseConfig);
  }

}
