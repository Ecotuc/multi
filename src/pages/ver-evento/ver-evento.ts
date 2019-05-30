import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServices } from '../../services/events.services';
// import { FirebaseService } from '../../services/firebase.service';

/**
 * Generated class for the VerEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-evento',
  templateUrl: 'ver-evento.html',
})
export class VerEventoPage {
	
	event = {id: null, 
			title: null,
			fecha: null,
			hora: null,
			descripcion: null,
			direccion: null,
			recordatorio: null,
			repeticion: null};

	eid = null;
	uid = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, eventServices: EventServices) {
		this.uid = navParams.get('uid');
		this.eid = navParams.get('eid');
  	// this.event = eventsService.getEvent(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerEventoPage');
  }

}
