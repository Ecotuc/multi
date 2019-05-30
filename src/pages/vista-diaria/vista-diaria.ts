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
  aux2 = null;
  theDate = null;
  theDate2 = null;
  sday = null;
  smonth = null;
  syear = null;
  aday = null;
  amonth = null;
  ayear = null;
  fday = null;
  fmonth = null;
  fyear = null;

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
    if (this.day == null || this.month == null || this.year == null) 
    {
      this.theDate = new Date();
      this.day = this.theDate.getDate();
      this.month = this.theDate.getMonth() + 1;
      this.year = this.theDate.getFullYear();
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.day.length == 1) this.day = "0"+ this.day;
    }else
    {
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.day.length == 1) this.day = "0"+ this.day;
      
      this.theDate = new Date(this.year , this.month , this.day);
    }
    this.aux = this.year+"-"+ this.month +"-"+ this.day; 
    this.theDate = this.theDate.toDateString();
    this.eventServices.getEvents(this.uid).valueChanges().subscribe(events => 
    {
      this.all_events = events;
      if (this.all_events.length>0) 
      {
        for (let i = 0; i < this.all_events.length; i++) 
        {
          isValid =  this.valid_range(this.all_events[i].startDate, this.aux, this.all_events[i].endDate);
          if (isValid)this.events1.push(this.all_events[i]);   
          // debugger
        }
      }
    });
  }

  private valid_range(startDate, aux, endDate)
  {
    //get the day, month and year from each date
    // debugger
    this.sday = startDate.substr(8,2);
    this.smonth = startDate.substr(5, 2);
    this.syear = startDate.substr(0,4);

    this.fday = endDate.substr(8,9);
    this.fmonth = endDate.substr(5, 2);
    this.fyear = endDate.substr(0,4);

    this.aday = aux.substr(8,2);
    this.amonth = aux.substr(5, 2);
    this.ayear = aux.substr(0,4);

    //parsing each string date to integer
    this.sday = parseInt(this.sday, 10);
    this.smonth = parseInt(this.smonth, 10);
    this.syear = parseInt(this.syear, 10);

    this.fday = parseInt(this.fday, 10);
    this.fmonth = parseInt(this.fmonth, 10);
    this.fyear = parseInt(this.fyear, 10);

    this.aday = parseInt(this.aday, 10);
    this.amonth = parseInt(this.amonth, 10);
    this.ayear = parseInt(this.ayear, 10);
    // debugger
    if (startDate == aux)
    {
      return true;
    } 
    else if (this.sday <= this.aday && this.aday <= this.fday) 
      if (this.smonth <= this.amonth && this.amonth <= this.fmonth) 
        if (this.syear <= this.ayear && this.ayear <= this.fyear) return true;
    
  }
}
