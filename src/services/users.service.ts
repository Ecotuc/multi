import { Injectable} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable()

export class UsersService{
    constructor(public afDB: AngularFireDatabase, public alertCtrl: AlertController, public afAuth:AngularFireAuth){

    }
    users = [];
    users1 =[];

    public login() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      }
    public logout() {
    this.afAuth.auth.signOut();
    }

    public getUsers(){
        // return this.users;
        return this.afDB.list('users/');
    }

    public getUser(id){
        return this.users1.filter(function(e, i){return e.id == id})[0] || {id: null, nombre :null, username:null, correo:null, password:null, password2:null, sexo:null, myDate:null, trabaja:null, estudia:null};
        // return this.afDB.object('users/'+ id);
    }

    public getUserF(id) {
        // return this.users.filter(function(e, i){return e.id == id})[0] || {id: null, nombre :null, username:null, correo:null, password:null, password2:null, sexo:null, myDate:null, trabaja:null, estudia:null};
        return this.afDB.object('users/' + id);
    }

    public createUser(user){
        this.users1.push(user);
    }

    public createUserF(user) {
        this.afDB.database.ref('users/' + user.id).set(user);
        // this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        // .then((response) =>
        // {
        //     console.log("Usuario creado")
        // })
        // .catch((error) => 
        // {
        //     console.log("entró");
            
        //     console.log('Error: ', error);
        // });
    }

    public editUser(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == user.id) {
                this.users[i] = user;
            }
        }
    }

    /**
     * ecitUserF 
     */
    public editUserF(user) {
        this.afDB.database.ref('users/' + user.id).set(user);
    }

    /**
     * deleteUser
     */
    public deleteUser(user) {
        this.afDB.database.ref('users/' + user.id).remove();
        // for (let i = 0; i < this.users.length; i++) {
        //     if (this.users1[i].id == user.id) {
        //         this.users1.splice(i,1);
        //     }
        // }
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
