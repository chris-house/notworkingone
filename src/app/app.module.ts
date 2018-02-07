import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { MembersComponent } from './members/members.component';
import { SignupComponent } from './signup/signup.component';
import  { HomeComponent } from './home/home.component';

import { AngularFireAuth } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './auth.service';


import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavbarComponent } from 'app/components/navbar/navbar.component';


export const firebaseConfig = {
  apiKey: "AIzaSyA-t0rWIqM-opMhuRHpnbUNCu02MeHxxsE",
  authDomain: "hope-5278e.firebaseapp.com",
  databaseURL: "https://hope-5278e.firebaseio.com",
  projectId: "hope-5278e",
  storageBucket: "hope-5278e.appspot.com",
  messagingSenderId: "611162014865"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    HomeComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

    AppComponent,
    LoginComponent,
    EmailComponent,
    MembersComponent,
    SignupComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard,
    AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
