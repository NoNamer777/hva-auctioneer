import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser: any;
  token: string;

  constructor() {
  }

  signOn(eMail: string, passWord: string) {
    return firebase.auth().signInWithEmailAndPassword(eMail, passWord).then(response => {
      this.currentUser = firebase.auth().currentUser.email;
      firebase.auth().currentUser.getIdToken().then(token => this.token = token)
        .catch(error => console.log('error', error));
      return response;
    });
  }

  signOff() {
    this.currentUser = null;
    this.token = null;
    return firebase.auth().signOut().then(response => response);
  }

  getToken() {
    return this.token;
  }

  refreshToken() {
    this.token = firebase.auth().currentUser.refreshToken;
  }
}
