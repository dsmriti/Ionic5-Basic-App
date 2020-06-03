import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Book Ride',
      url: '/home',
      icon: 'car' 
    },
    {
      title: 'Your Ride',
      url: '/home/',
      icon: 'navigate'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person-circle'
    },
    {
      title: 'Ride History',
      url: '/home',
      icon: 'bookmark'
    },
    {
      title: 'Notification',
      url: '/home',
      icon: 'notifications'
    },
    {
      title: 'Help & Support',
      url: '/home',
      icon: 'help-circle'
    },
    {
      title: 'Settings',
      url: 'settings',
      icon: 'settings'
    }
  ];
  
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home/']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('login')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  logoutUser(){
    this.authService.logout();
   
  }
}
