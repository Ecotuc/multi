import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../services/users.service';

/**
 * Generated class for the WelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wel',
  templateUrl: 'wel.html',
})
export class WelPage {
  user = {id: null, nombre :null, username:null, correo:null, password:null, password2:null, sexo:null, myDate:null, trabaja:null, estudia:null};
  id = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public usersService: UsersService) {
    this.id = navParams.get('id');
    this.user = usersService.getUser(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelPage');
  }

}
