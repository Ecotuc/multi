import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VistaDiariaPage } from '../vista-diaria/vista-diaria';

/**
 * Generated class for the VistaMensualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista-mensual',
  templateUrl: 'vista-mensual.html',
})
export class VistaMensualPage {
  uid = null;
  date = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uid = this.navParams.get('uid');
    // this.op = this.navParams.get('op');
    this.getDaysOfMonth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaMensualPage');
  }
  getDaysOfMonth() {
    // debugger
    
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    // debugger
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  vista_diaria(day, month, year){
    // debugger
    if (day == new Date().getDate().toString() ) {
      this.navCtrl.getPrevious().data.rep = 1;
      this.navCtrl.getPrevious().data.day = day;
      this.navCtrl.getPrevious().data.month = month+1;
      this.navCtrl.getPrevious().data.year= year;

      this.navCtrl.pop();
    }else{
      this.navCtrl.push( VistaDiariaPage, {uid:this.uid, op:1, day:day, month:(month+1), year:year} );
    }    
  }

}
