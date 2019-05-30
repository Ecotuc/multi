import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import { Registro1Page } from '../registro1/registro1';
// import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html'
})
export class crudPage {
  users = [];
  user:any = {id: null, nombre :null, username:null, correo:null, password:null, password2:null, sexo:"", myDate:"", trabaja:null, estudia:null};
  user1:any = {id: null, nombre :null, username:null, correo:null, password:null, password2:null, sexo:"", myDate:"", trabaja:null, estudia:null};
  id = null;
  constructor(public navCtrl: NavController, public usersService: UsersService) {
    usersService.getUsers().valueChanges()
    .subscribe(users => {
      this.users = users;
    });
  }

  gotoWel(id)
  {
    this.navCtrl.push(Registro1Page, { id:id, edited:1 });
  }

  registrarse()
  {
  	this.navCtrl.push(Registro1Page);
  }
  public dddd(id) {
    this.usersService.getUserF(id).valueChanges()
    .subscribe(user => {
      this.user = user;
    });
    this.usersService.deleteUser(this.user);
  }
}
