import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServices } from '../../services/events.services';
import { CrearEventoPage } from '../crear-evento/crear-evento';
import { VistaMensualPage } from '../vista-mensual/vista-mensual';

/**
 * Generated class for the VistaDiariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista-diaria',
  templateUrl: 'vista-diaria.html',
})
export class VistaDiariaPage {

  all_events = [];
  op = null;
  rep = null;
  events1 = [];
  uid = null;
  eid = null;
  day = null;
  month = null;
  year = null;
  aux = null;
  theDate = null;
  theDate2 = null;
  sDate = null;
  fDate = null;
  aday = null;
  value = false;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventServices: EventServices) {
    this.uid = navParams.get('uid');
    this.op = navParams.get('op');
    this.day = navParams.get('day') ;
    this.month = navParams.get('month') ;
    this.year = navParams.get('year');
    // debugger
    this.validations();
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  
  public ionViewWillEnter() 
  {
    this.rep = this.navParams.get('rep');
    if (this.rep != undefined)this.events1 = [];
  } 
  
  ionViewDidLoad()
  {
    console.log('ionViewDidLoad VistaDiariaPage');
  }

  editarEvento(eid, dstartDate)
  {
    this.navCtrl.push(CrearEventoPage, { uid: this.uid ,eid: eid, dstartDate: dstartDate });
  }

  newEvent(uid)
  {
    if (this.day == null || this.month == null || this.year == null) {
      this.theDate2 = new Date();
      this.day = this.theDate2.getDate();
      this.day = this.theDate2.getDate();
      this.month = this.theDate2.getMonth() + 1;
      this.month = this.theDate2.getMonth() + 1;
      this.year = this.theDate2.getFullYear();
      this.year = this.theDate2.getFullYear();
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0" + this.month;
      if (this.day.length == 1) this.day = "0" + this.day;
    } else {
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0" + this.month;
      if (this.day.length == 1) this.day = "0" + this.day;
      this.theDate2 = new Date(this.year, this.month, this.day);
    }
    this.aux = this.year + "-" + this.month + "-" + this.day;
    this.navCtrl.push(CrearEventoPage, { uid: this.uid, date: this.aux });
  }

  monthly_view()
  {
    if (this.op == 1){
      this.navCtrl.pop();
    }else
    {
      this.navCtrl.push(VistaMensualPage, { uid: this.uid });
    }
  }

  private validations()
  { 
    var isValid = null;  
    // debugger 
    if (this.day == null || this.month == null || this.year == null) 
    {
      this.theDate = new Date();
      this.day = this.theDate.getDate();
      this.month = this.theDate.getMonth();
      this.year = this.theDate.getFullYear();
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.day.length == 1) this.day = "0"+ this.day;
    }else
    {
      if (this.month != 1) 
      {
        this.month = this.month-1;
      }
      else
      {
        this.month = 12;
      }

      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.day.length == 1) this.day = "0"+ this.day;
      
      this.theDate = new Date(this.year , this.month , this.day, 23, 59, 59);
    }
    this.aux = new Date(this.year, this.month, this.day, 23, 59, 59); 
    this.theDate = this.theDate.toDateString();
    this.eventServices.getEvents(this.uid).valueChanges().subscribe(events => 
    {
      this.all_events = events;
      if (this.all_events.length>0) 
      {
        for (let i = 0; i < this.all_events.length; i++) 
        {
          
          this.sDate = new Date(this.all_events[i].startDate);
          this.sDate.setHours(23,59,59);
          this.aday = parseInt(this.all_events[i].startDate.substr(8,2), 10);
          if(this.aday-1 == this.sDate.getDate()) this.sDate.setDate(this.aday);
          this.fDate = new Date(this.all_events[i].endDate);
          this.fDate.setHours(23,59,59);
          this.aday = parseInt(this.all_events[i].endDate.substr(8,2), 10);
          if(this.aday-1 == this.sDate.getDate()) this.sDate.setDate(this.aday);
          
          isValid =  this.valid_range(this.sDate, this.aux, this.fDate);
          if (isValid)this.events1.push(this.all_events[i]);   
          // debugger
        }
      }
    });
  }

  private valid_range(startDate, aux, endDate)
  {
    this.value = startDate <= aux &&  aux <= endDate ? true:false;
    return this.value;    
  }
  
  private sugerencias(startDate, aux)
  {
    
  }
  
}
