import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaDiariaPage } from './vista-diaria';

@NgModule({
  declarations: [
    VistaDiariaPage,
  ],
  imports: [
    IonicPageModule.forChild(VistaDiariaPage),
  ],
})
export class VistaDiariaPageModule {}
