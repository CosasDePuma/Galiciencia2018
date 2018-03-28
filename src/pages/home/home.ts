import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  data: any;

  constructor(public navCtrl: NavController, public rest: RestProvider) {
  }

  login() {

    this.rest.getGalicienciaData().then(
      (res) => {
        this.data = JSON.parse(JSON.stringify(res)).data;
        console.log(this.data);
      }
    );
  }
}
