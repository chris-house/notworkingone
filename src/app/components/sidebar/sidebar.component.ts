import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
  
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Starting',  icon: 'stars', class: '' }, 
    { path: 'table-list', title: 'Notifications',  icon:'library_books', class: '' }, 
    { path: 'icons', title: 'Install Code',  icon:'code', class: '' }, 
    { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: 'typography', title: 'Help Center',  icon:'help', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
    animations: [moveIn(), fallIn(), moveInLeft()] 
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  public name: any;
  public number1 : number;
  state: string = ''; 
  constructor(public af: AngularFireAuth,private router: Router) { 
    this.af.authState.subscribe(auth => {
        this.name = af.auth.currentUser.displayName;
        if(auth) {
          this.router.navigateByUrl('/home');
        }
        
      });
     
  }

  
  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
 }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
 
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  private menuItemsArray: any[] = [ 
    {"title":"Electricity","link":"#"},
    {"title":"Mobile Bill","link":"#"},
    {"title":"Home and Kitchen","link":"#",
    "subItems":[
                {"title":"Furniture","link":"#"},
                {"title":"Cookware","link":"#"},
               ]
    },
    {"title":"Car and Bike Accessories","link":"#",
     "subItems":[
                  {"title":"Tyres and Alloys","link":"#"},
                  {"title":"Comfort and Safety","link":"#"},
                 ]
    },
];

public onMenuClose(){
 console.log("menu closed");
}
public onMenuOpen(){
 console.log("menu Opened");
}
private onItemSelect(item:any){
 console.log(item);
}

}
