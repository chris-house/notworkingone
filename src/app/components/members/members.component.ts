import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
 
@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
 
export class MembersComponent implements OnInit {
  public name: any;
  public number1 : number;
  state: string = ''; 

  constructor(public af: AngularFireAuth, private router: Router) {
      
    this.af.authState.subscribe(auth => {
      this.name = af.auth.currentUser.displayName;
      if(auth) {
        this.router.navigateByUrl('/dashboard');
      }
      
    });
  }

  logout() {
     this.af.auth.signOut();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}