import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component'; 
import { MembersComponent } from './members/members.component'; 


import { BrowserModule } from '@angular/platform-browser';
 
import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.service'; 

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
 
export const firebaseConfig = {
  apiKey: "AIzaSyA-t0rWIqM-opMhuRHpnbUNCu02MeHxxsE",
  authDomain: "hope-5278e.firebaseapp.com",
  databaseURL: "https://hope-5278e.firebaseio.com",
  projectId: "hope-5278e",
  storageBucket: "hope-5278e.appspot.com",
  messagingSenderId: "611162014865"
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule, 

    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    FormsModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

    LoginComponent,
    EmailComponent,
    MembersComponent,
    SignupComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MembersComponent
  ],
  providers: [AuthGuard, 
    AngularFireAuth], 
  bootstrap: [AppComponent]
})
export class ComponentsModule { }
