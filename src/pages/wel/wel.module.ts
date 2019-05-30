import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelPage } from './wel';

@NgModule({
  declarations: [
    WelPage,
  ],
  imports: [
    IonicPageModule.forChild(WelPage),
  ],
})
export class WelPageModule {}
