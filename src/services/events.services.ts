import { Injectable} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from 'ionic-angular';
@Injectable()

export class EventServices{
    constructor(public afDB: AngularFireDatabase, public alertCtrl: AlertController){

    }
    events = [];
    events1 =[];

    public getEvents(uid){
        return this.afDB.list('users/'+uid+'/events/');
    }

    public getEventF(uid, eid) {
        return this.afDB.object('users/'+uid+'/events/' + eid);
    }

    public createEventF(uid, event) {
        this.afDB.database.ref('users/'+uid+'/events/' + event.id).set(event);
    }

    /**
     * deleteEvent
     */
    public deleteEvent(event) {
        this.afDB.database.ref('events/' + event.id).remove();
    }

    public dalert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title:title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }
}
