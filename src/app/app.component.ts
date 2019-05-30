import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CrearEventoPage } from '../pages/crear-evento/crear-evento';
import { VistaDiariaPage } from '../pages/vista-diaria/vista-diaria';
import { VistaMensualPage } from '../pages/vista-mensual/vista-mensual';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  // rootPage:any = CrearEventoPage;
  // rootPage:any = VistaDiariaPage;
  // rootPage:any = VistaMensualPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

