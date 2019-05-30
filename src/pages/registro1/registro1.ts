import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Registro2Page } from '../registro2/registro2';
import { UsersService } from '../../services/users.service';
import { FormGroup } from '@angular/forms';


/**
 * Generated class for the Registro1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro1',
  templateUrl: 'registro1.html',
})
export class Registro1Page {

  registerForm : FormGroup;

  user:any = {id: null, nombre :null, username:null, correo:null, password:null, sexo:"", myDate:"", trabaja:null, estudia:null};
  password2 = '';
  
  id = null;
  edited = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public usersService: UsersService) {
    this.id = navParams.get('id');
    // this.id =  1;
    if (this.id != undefined) {
      usersService.getUserF(this.id).valueChanges()
      .subscribe(user=> {
        this.user = user;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro1Page');
  }
  
  public addUser()
  {
    if (this.user.id != undefined && this.user.id != 0) 
    {
      // console.log("entro: " + this.user.id);
      this.editUser();
    }else
    {
      // console.log("user " + this.user);
      this.newUser();
    }
    
  }


  private newUser() 
  {
    this.user.id = Date.now();
    if (this.user.nombre == null || this.user.username == null || this.user.correo == null || this.user.password == null || this.password2 == null) {
      this.usersService.dalert("Error","Por favor llene los campos");
    }
    else if (this.user.password != this.password2) {
      this.usersService.dalert("Error","Las contraseñas no coinciden");
    }
    else {
      
      // console.log("Nombre: " + this.user.nombre);
      // console.log("Username: " + this.user.username);
      // console.log("Correo: " + this.user.correo);
      // console.log("Password: " + this.user.password);
      // this.user.sexo="";
      // this.user.myDate="";
      this.usersService.createUser(this.user);
      // console.log("Id: " + this.user.id);
      this.navCtrl.push(Registro2Page, { id: this.user.id, edited:0});
    }
  }

  private editUser()
  {
    if (this.user.nombre == "" || this.user.username == "" || this.user.correo == "" || this.user.password == "" || this.password2 == "") {
       this.usersService.dalert("Error","Por favor llene los campos");
    }
    else if (this.user.password != this.password2) {
       this.usersService.dalert("Error","Las contraseñas no coinciden");
    }
    else {
      this.usersService.editUserF(this.user);
      this.navCtrl.push(Registro2Page, { id: this.user.id, edited:1});
    }
  }


  public deleteUser() {
    this.navCtrl.pop();
    this.usersService.deleteUser(this.user);
  }
}
