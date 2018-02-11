 
import { Component, OnInit, HostBinding,OnDestroy } from '@angular/core';
 
import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';
import {Subscription} from 'rxjs'
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit,OnDestroy {

  error: any;
  public sub:Subscription;
constructor(public af: AngularFireAuth, private router: Router) {

   this.sub= this.af.authState.subscribe(auth => { 
    if(auth) {
      console.log(auth)
      ///why are you naviagting it from here?
      this.router.navigate(['/home']);
    }
  });
 // this.sub.add(sub);
}
//
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
      // lets try something
      console.log('here');
      this.router.navigateByUrl('/home');
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

ngOnDestroy(){
  if(this.sub)
  this.sub.unsubscribe();
}
}
