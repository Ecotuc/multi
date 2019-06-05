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
  events1 = [];
  sevents = [];
  eventosAyer = [];
  eventosAnteAyer = [];
  op = null;
  rep = null;
  uid = null;
  eid = null;
  day = null;
  month = null;
  year = null;
  aux = null;
  hey = null;
  theDate = null;
  theDate2 = null;
  sDate = null;
  fDate = null;
  aday = null;
  value = false;
  isValid = null;
  isSuggest = null;
  ls = null;
  oneDay = 86400000;
  oneMonth = 2628000000;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventServices: EventServices) {
    this.uid = navParams.get('uid');
    this.op = navParams.get('op');
    this.day = navParams.get('day') ;
    this.month = navParams.get('month');
    this.year = navParams.get('year');
    // debugger
    //this.validations();
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  
  public ionViewWillEnter() 
  {
    this.uid = this.navParams.get('uid');
    this.op = this.navParams.get('op');
    this.rep = this.navParams.get('rep');
    this.day = this.navParams.get('day') ;
    this.month = this.navParams.get('month') ;
    this.year = this.navParams.get('year');
    this.events1 = [];
    this.sevents = [];
    /*if (this.rep != undefined)
    {
    }*/
    this.validations();
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
      this.month++;
      this.month = this.month.toString();
      this.day = this.day.toString();
      if (this.month.length == 1) this.month = "0" + this.month;
      if (this.day.length == 1) this.day = "0" + this.day;
      this.theDate2 = new Date(this.year, this.month, this.day);
    }
    this.aux = this.year + "-" + this.month + "-" + this.day;
    this.navCtrl.push(CrearEventoPage, { uid: this.uid, date: this.aux });
    this.aux = new Date(this.year, this.month, this.day, 23, 59, 59); 
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

  private valid_range(startDate, aux, endDate)
  {
    this.value = startDate <= aux &&  aux <= endDate ? true:false;
    return this.value;    
  }
  
  private suggestions(ostartDate, ax)
  {
    // debugger;
    this.value = false;
    ax.setMonth(ax.getMonth() - 1);
//    ax.setHours(23,59,59);
    if (ostartDate.getTime() === ax.getTime()) {
      this.value = true;
    }
    return this.value;
  }

  private suggestionsAyer(ostartDate, ax)
  {
    this.value = false;
    ax.setDate(ax.getDate() - 1);

    if (ostartDate.getTime() === ax.getTime()) {
        this.value = true;
      }

      return this.value;
  }

  private suggestionsAnteAyer(ostartDate, ax)
  {
    this.value = false;
    ax.setDate(ax.getDate() - 2);

    if (ostartDate.getTime() === ax.getTime()) {
        this.value = true;
      }

      return this.value;
  }

  private yaExiste(sugerencias, evento)
  {
    this.value = false;

    for(let i = 0; i < sugerencias.length; i++)
    {
      if(sugerencias[i].title == evento.title)
      {
        this.value = false;
        break;
      }
      else
      {
        this.value = true;
      }
    }

    return this.value;
  }

  private validations()
  { 
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
    this.hey = new Date(this.year, this.month, this.day, 23, 59, 59); 
    this.theDate = this.theDate.toDateString();
    this.eventServices.getEvents(this.uid).valueChanges().subscribe(events => 
    {
      this.all_events = events;
      if (this.all_events.length > 0) 
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
          if(this.aday-1 == this.fDate.getDate()) this.fDate.setDate(this.aday);

          this.isValid =  this.valid_range(this.sDate, this.aux, this.fDate);
          if (this.isValid)this.events1.push(this.all_events[i]);   
          // this.xilar = this.aux
         // debugger;
          this.isSuggest = this.suggestions(this.sDate, this.aux );
          if (this.isSuggest)this.sevents.push(this.all_events[i]);
          this.aux = new Date(this.year, this.month, this.day, 23, 59, 59); 
          
          this.isSuggest = this.suggestionsAyer(this.sDate, this.aux );
          if (this.isSuggest)this.eventosAyer.push(this.all_events[i]);
          this.aux = new Date(this.year, this.month, this.day, 23, 59, 59); 
          
          this.isSuggest = this.suggestionsAnteAyer(this.sDate, this.aux );
          if (this.isSuggest)this.eventosAnteAyer.push(this.all_events[i]);
          this.aux = new Date(this.year, this.month, this.day, 23, 59, 59); 
          
          for(let k = 0; k < this.eventosAyer.length; k++)
          {
            for(let j = 0; j < this.eventosAnteAyer.length; j++)
            {
              if(this.eventosAyer[k].title == this.eventosAnteAyer[j].title)
                if(!this.yaExiste(this.sevents, this.eventosAyer[k])) this.sevents.push(this.eventosAyer[k]);
            }
          }
        }
      }
    });
  }
  
}
