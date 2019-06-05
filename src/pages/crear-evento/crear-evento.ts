import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { EventServices } from '../../services/events.services';
import { debug } from 'util';



/**
 * Generated class for the CrearEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-evento',
  templateUrl: 'crear-evento.html',
})
export class CrearEventoPage
{
	day = null;
	month = null;
	year = null;

	sday = null;
	smonth = null;
	syear = null;
	shour = null;
	sminute = null;
	
	theDate2 = null;
	aday = null;
	amonth = null;
	ayear = null;
	
	fday = null;
	fmonth = null;
	fyear = null;
	fhour = null;
	fminute = null;

	sbackDate = null;
	ebackDate = null;
	
	event: any = 
	{	
		id: null,
		uid: null, 
		title: null,
		startDate: null,
		dstartDate: null,
		endDate: null,
		location: null,
		allday: null,
		repeat: "no",
//		reminder: "no",
		description: null
	};
	
	uid = null;
	eid = null;
	aux = null;
	daux = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, public eventServices: EventServices) {
		this.uid = navParams.get('uid');
		this.eid = navParams.get('eid'); 
		this.aux = navParams.get('date');
		// this.daux = navParams.get('dstartDate');
		if (this.aux != undefined) {
			this.event.startDate = this.aux + "T00:00:00Z";
		}
		// else
		// {
		// 	this.aux = this.daux.substr(6,4) +"-"+ this.daux.substr(3,2) + "-" + this.daux.substr(0,2);
		// }
		
		// this.daux = this.aux.substr(8,9) + "-" + this.aux.substr(5,2) + "-" +this.aux.substr(0,4) ;

		if (this.eid != undefined) 
		{
			eventServices.getEventF(this.uid, this.eid).valueChanges()
			.subscribe(event => {
				this.event = event;
				this.sbackDate = this.event.startDate;
				this.ebackDate = this.event.endDate;
			});
			this.validateAllDay();
		}
  	}

	ionViewDidLoad()
	 {
		console.log('ionViewDidLoad CrearEventoPage');
	}

  	disableTime()
	{
		var x = document.getElementById("Time");
		if (x.style.display === "none" || this.event.allday == false) {
			x.style.display = "block";
		} 
		else if (x.style.display != "none"|| this.event.allday == true) 
		{
			if (this.aux != undefined) 
			{
				this.event.startDate = this.aux + "T00:00:00Z";
				this.event.endDate = this.aux + "T23:59:59Z";
			}
			else
			{
				this.event.startDate = this.event.startDate.substr(0,10) + "T00:00:00Z";
				this.event.endDate = this.event.endDate.substr(0,10) + "T23:59:59Z";
			}
			x.style.display = "none";
		}
	}

	private validateAllDay() 
	{
		// console.log(this.event.allday);
		var x = document.getElementById("Time");
		if (this.event.allday == false) {
			x.style.display = "block";
		} 
		else if (this.event.allday == true) 
		{
			x.style.display = "none";
		}
	}
	
	private validateTime()
	{
		this.sday = this.event.startDate.substr(8,2);
		this.smonth = this.event.startDate.substr(5, 2);
		this.syear = this.event.startDate.substr(0,4);
		this.shour = this.event.startDate.substr(11, 2);
		this.sminute = this.event.startDate.substr(14,2);
		
		this.fday = this.event.endDate.substr(8,2);
		this.fmonth = this.event.endDate.substr(5, 2);
		this.fyear = this.event.endDate.substr(0,4);
		this.fhour = this.event.endDate.substr(11, 2);
		this.fminute = this.event.endDate.substr(14,2);


		this.sday = parseInt(this.sday, 10);
		this.smonth = parseInt(this.smonth, 10);
		this.syear = parseInt(this.syear, 10);
		this.shour = parseInt(this.shour, 10);
		this.sminute = parseInt(this.sminute, 10);

		this.fday = parseInt(this.fday, 10);
		this.fmonth = parseInt(this.fmonth, 10);
		this.fyear = parseInt(this.fyear, 10);
		this.fhour = parseInt(this.fhour, 10);
		this.fminute = parseInt(this.fminute, 10);
		if (this.sday > this.fday|| this.smonth > this.fmonth || this.syear > this.fyear)
		{
			 this.eventServices.dalert("Error","Elija un rango de fechas válido");
			return false;
		}else
		{
			if (this.sday == this.fday && this.smonth == this.fmonth && this.syear == this.fyear) 
			{
				if (this.shour < this.fhour) {
					return true;
				}
				else{
					 this.eventServices.dalert("Error","Elija un rango de horas válido");
					return false;
				}
			}
			else
			{
				return true;
			}
		}
		// console.log(this.event.endDate);
		
	}

	crearEvento()
	{
		if (this.eid != undefined) 
		{
			this.editEvent();
			
		}else
		{
			this.newEvent();
		}
	}

	private newEvent() 
	{
		this.event.id = 'e'+ Date.now();
		if (this.event.title == null ||
			this.event.startDate == null ||
			this.event.endDate == null)
			//			this.event.reminder == null) 
		{
			 this.eventServices.dalert("Error","Por favor llene todos los campos");
		}

		else {
			this.event.dstartDate = this.event.startDate.substr(8,2) +"-"+ this.event.startDate.substr(5,2) +"-"+ this.event.startDate.substr(0,4);
			// this.event.endDate = this.event.endDate.substr(8, 9) + "-" + this.event.endDate.substr(5, 2) + "-" + this.event.endDate.substr(0, 4);
			this.eventServices.createEventF(this.uid, this.event);
			this.navCtrl.getPrevious().data.rep = 1;
			this.navCtrl.pop();
			
		}
	}

	private editEvent () 
	{
		if (this.event.title == "" ||
		this.event.startDate == "" ||
		this.event.endDate == "")
//		this.event.reminder == "") {
			 this.eventServices.dalert("Error","Por favor llene todos los campos");
		}else
		{	
			this.event.dstartDate = this.event.startDate.substr(8, 2) + "-" + this.event.startDate.substr(5, 2) + "-" + this.event.startDate.substr(0, 4);
			// this.event.endDate = this.event.endDate.substr(8, 9) + "-" + this.event.endDate.substr(5, 2) + "-" + this.event.endDate.substr(0, 4);
			this.eventServices.createEventF(this.uid, this.event);
			this.navCtrl.getPrevious().data.rep = 1;
			this.navCtrl.pop();
		}
	}

	public ionViewWillEnter() 
	{
		this.validateAllDay();
	}
}
