 
import { Component, OnInit, HostBinding } from '@angular/core';
 
import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  error: any;
constructor(public af: AngularFireAuth, private router: Router) {

    this.af.authState.subscribe(auth => { 
    if(auth) {
      this.router.navigateByUrl('/login');
    }
  });
}

loginFb() {
  this.af.auth.signInWithPopup( 
    new firebase.auth.FacebookAuthProvider()
   ).then((value) => {
      this.router.navigate(['/home']);
    }).catch(
      (err) => {
      this.error = err;
    })
}
         
loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();               
  return this.oAuthLogin(provider)
    .then((value) => {
      this.router.navigate(['/home']);
    }).catch(
      (err) => {
      this.error = err;
    })
}

ngOnInit() {
}

private oAuthLogin(provider) {
  return this.af.auth.signInWithPopup(provider); 
}

}
