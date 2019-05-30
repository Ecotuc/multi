import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaMensualPage } from './vista-mensual';

@NgModule({
  declarations: [
    VistaMensualPage,
  ],
  imports: [
    IonicPageModule.forChild(VistaMensualPage),
  ],
})
export class VistaMensualPageModule {}
