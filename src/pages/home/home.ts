import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { VotesPage } from '../votes/votes'
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  data: any = undefined;
  jurado: any = undefined;

  user:string = undefined;
  pass:string = undefined;

  constructor(public navCtrl: NavController, private rest: RestProvider, private alertCtrl: AlertController) {
    this.getData();
  }

  getData() {
    this.rest.getJuradoLogin().then(
      (res) => {
        this.data = JSON.parse(JSON.stringify(res)).data;
      }
    )
  }

  checkLogin() {
    if(this.data == undefined) {
      // error de datos
    } else if(this.user == undefined || this.pass == undefined || this.user == '' || this.pass == '') {
      this.emptyCredentials()
    } else {
      this.checkCredentials(this.user, this.pass)
      if(this.jurado == undefined) {
        this.wrongCredentials()
      } else {
        this.navCtrl.setRoot(VotesPage, {
          group: this.jurado.group,
          group_member: this.jurado.group_member
        })
      }
    }
  }

  checkCredentials(nombre: string, password: string) {
    this.jurado = undefined

    this.data.jurado.forEach(jurado => {
      if(this.jurado == undefined && nombre == jurado.username && password == jurado.password) {
        this.jurado = jurado;
      }
    })
  }

  emptyCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Debe rellenar todos los campos.',
      buttons: ['Aceptar']
    })
    alert.present()
  }

  wrongCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Las credenciales de acceso no se corresponden a ningún usuario.',
      buttons: ['Aceptar']
    })
    alert.present()
  }
}
