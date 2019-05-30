import { Component } from '@angular/core';
import { NavController, Alert, AlertController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import { Registro1Page } from '../registro1/registro1';
import { VistaDiariaPage } from '../vista-diaria/vista-diaria';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ok = 0;
  null = 0;
  wrong = 0;
  users = [];
  id = null;
  user:any = {id: null, nombre :null, username:null, correo:null, password:null, sexo:"", myDate:"", trabaja:null, estudia:null};
  username = null;
  password = null;
  constructor(public navCtrl: NavController, public usersService: UsersService, public afDB: AngularFireDatabase, public alertCtrl: AlertController) {
    usersService.getUsers().valueChanges()
    .subscribe(users => {
      this.users = users;
      // debugger 
    });
  }
 
  iniciarSesion()
  {
    // debugger
    if (this.username != null || this.password != null)
    {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username == this.username && this.users[i].password == this.password && i < this.users.length) 
        {
          this.ok ++;
          this.id = this.users[i].id;
          // break;
        } else if (i < this.users.length)
        {
          this.wrong ++;
          // break;
        }
      }
    }else{
      this.usersService.dalert("Error","Favor ingresar un usuario y una contraseña");
      
    }
    // debugger
    if (this.ok == 1) 
    {
      // console.log('ok');
      this.navCtrl.push(VistaDiariaPage, {uid: this.id});
      
    }
    else if (this.null !=0)
    {
      console.log('null');
      
    }else if (this.wrong  ==  this.users.length )
    {
      // console.log('wrong');
      console.log("Usuario o contraseña incorrecta");
      this.usersService.dalert("Error","Usuario o contraseña incorrectos");
      
    }
  }

  editarUsuario(id)
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
