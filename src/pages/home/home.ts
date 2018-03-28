import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  data: any;

  user:string;
  pass:string;

  constructor(public navCtrl: NavController, private rest: RestProvider, private alertCtrl: AlertController) {
    this.getData();
  }

  getData() {
    this.rest.getGalicienciaData().then(
      (res) => {
        this.data = JSON.parse(JSON.stringify(res)).data;
        console.log(this.data);
      }
    );
  }

  checkLogin() {
    if(this.user == undefined || this.pass == undefined || this.user == '' || this.pass == '') {
      this.emptyCredentials();
    } else {
      console.log("Comprobación de datos");
    }
  }

  emptyCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Debe rellenar todos los campos.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  wrongCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Las credenciales de acceso no se corresponden a ningún usuario.',
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
