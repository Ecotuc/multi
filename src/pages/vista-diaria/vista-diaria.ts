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
  montha = null;
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
  eday = false;
  emonth = false;
  eyear = null;
  esday = null;
  esmonth = false;
  esyear = false;
  efday = false;
  efmonth = false;
  efyear = false;
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
      this.month = this.theDate.getMonth() + 1;
      this.montha = this.month;
      this.year = this.theDate.getFullYear();
      this.month = this.month.toString();
      this.montha = this.montha.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.montha.length == 1) this.montha = "0"+ this.montha;
      if (this.day.length == 1) this.day = "0"+ this.day;
    }else
    {
      this.montha = this.month;
      if (this.month != 1) 
      {
        this.month = this.month-1;
      }
      else
      {
        this.month = 12;
      }

      this.month = this.month.toString();
      this.montha = this.montha.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0"+ this.month;
      if (this.montha.length == 1) this.montha = "0"+ this.montha;
      if (this.day.length == 1) this.day = "0"+ this.day;
      
      this.theDate = new Date(this.year , this.month , this.day);
    }
    this.aux = this.year+"-"+ this.montha +"-"+ this.day; 
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

    this.fday = endDate.substr(8,2);
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
    this.esday = this.aday != this.sday;
    this.esmonth = this.amonth != this.smonth;
    this.esyear = this.ayear != this.syear;
    this.efday = this.aday != this.fday;
    this.efmonth = this.amonth != this.fmonth;
    this.efyear = this.ayear != this.fyear;
    this.eday =  this.esday|| this.efday ? true:false;
    this.emonth =  this.esmonth|| this.efmonth ? true:false;
    this.eyear =  this.eyear|| this.efyear ? true:false;
    
    debugger
    this. eyear = new Date(2019, 2, 25);
    this. esday = new Date(2025, 2, 25);


    if (startDate.substr(10,10) == aux)
    {
      this.value = true;
    } else if (this.syear <= this.ayear && this.ayear <= this.fyear && this.eyear) {
      if (this.esyear) {
        this.value = this.ayear > this.syear ? true:false;
      }else{
        if (this.ayear < this.fyear) {
          if (this.smonth <= this.amonth && this.amonth <= this.fmonth && this.emonth){
            if(this.sday <= this.aday && this.aday <= this.fday && this.eday){
              this.value = true;
            }else{
              return false;
            }
          }else{
            if(this.sday <= this.aday && this.aday <= this.fday && this.eday){
              this.value = true;
            }else{
              return false;
            }
          }
        }
        this.value = this.ayear <= this.fyear ? true:false;
      }
    }else{
      if (this.smonth <= this.amonth && this.amonth <= this.fmonth && this.emonth){
        if (this.esmonth) {
          this.value = this.amonth > this.smonth ? true:false;
        }else{
          if(this.sday <= this.aday && this.aday <= this.fday && this.eday){
            return true;
          }else{
            return false;
          }
        }
      }else{
        if(!this.eyear){
          if(this.sday <= this.aday && this.aday <= this.fday && this.eday){
            return true;
          }else{
            return false;
          }
        }else{
          return true;
        }

      }
    }


    return this.value;



















    
    // else if (this.sday <= this.aday && this.aday <= this.fday) 
    //   if (this.smonth <= this.amonth && this.amonth <= this.fmonth) 
    //     if (this.syear <= this.ayear && this.ayear <= this.fyear) return true;
    
  }
}
