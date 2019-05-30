import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../services/users.service';

/**
 * Generated class for the Registro2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 //DD/MM/YYYY

@IonicPage()
@Component({
  selector: 'page-registro2',
  templateUrl: 'registro2.html',
})
export class Registro2Page {
  id = null;
  edited = 0;
  user:any = {id: null, nombre :null, username:null, correo:null, password:null, sexo:null, myDate:null, trabaja:null, estudia:null};
  user1:any = { id: null, nombre: null, username: null, correo: null, password: null, sexo: null, myDate: null, trabaja: null, estudia: null };
  
//  formattedDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usersService: UsersService) {
    this.id = navParams.get('id');
    this.edited = navParams.get('edited');


    // console.log("username: "+this.id);
    if (this.edited != 0 ) {
      usersService.getUserF(this.id).valueChanges()
      .subscribe(user=> {
        this.user = user;
      });
    }else
    {
      this.user = usersService.getUser(this.id); 
    }

    // console.log("Idd: " + this.user);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro2Page');
  }

  continuar2()
  {
    /* var mydate = new Date.get();
    var year = mydate.getFullYear().toString();
    var month = mydate.getMonth().toString();
    var day = mydate.getDate().toString();

    this.formattedDate = year + month + day;
    */
   
    // this.user.myDate = new Date().toISOString();
    if(this.user.sexo == undefined || this.user.myDate == undefined)
    {
      this.usersService.dalert("Error","Por favor llene los campos");
    }
    else
    {
      // this.user.myDate = this.user.myDate.toISOString();
      // console.log("sexo: " + this.user.nombre);
      // console.log("mydate: " + this.user.myDate);
      // console.log("trabajas: " + this.user.trabaja);
      // console.log("sexo: " + this.user.sexo);  
      this.usersService.createUserF(this.user);
      this.navCtrl.pop();
      this.navCtrl.pop();
    }
  }


}
