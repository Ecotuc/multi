import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { WelPageModule } from '../pages/wel/wel.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { UsersService } from '../services/users.service';
import { EventServices } from '../services/events.services';

import { Registro1PageModule } from '../pages/registro1/registro1.module';
import { Registro2PageModule } from '../pages/registro2/registro2.module';
import { BienvenidoPageModule } from '../pages/bienvenido/bienvenido.module';
import { VistaDiariaPageModule } from '../pages/vista-diaria/vista-diaria.module';
import { CrearEventoPageModule } from '../pages/crear-evento/crear-evento.module';
import { VerEventoPageModule } from '../pages/ver-evento/ver-evento.module';
import { VistaMensualPageModule } from '../pages/vista-mensual/vista-mensual.module';


// import { NgCalendarModule} from 'ionic2-calendar';

export const firebaseConfig = {
  apiKey: "AIzaSyDn8wegOnXN1U1H5somDCmhseFclRcT0FU",
  authDomain: "multitask1030.firebaseapp.com",
  databaseURL: "https://multitask1030.firebaseio.com",
  storageBucket: "multitask1030.appspot.com",
  messagingSenderId: '963088475538'
} 

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    WelPageModule,
    Registro1PageModule,
    Registro2PageModule,
    BienvenidoPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    VistaDiariaPageModule,
    VistaMensualPageModule,
    CrearEventoPageModule,
    VerEventoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    EventServices,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService
  ]
})
export class AppModule {}
