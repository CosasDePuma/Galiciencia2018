import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  users: any;

  constructor(public navCtrl: NavController, public rest: RestProvider) {
  }

  login() {

    var data = this.rest.getLoginJurado();
    
    if(data != null) {
      console.log(data);
    } else {
      console.log("Inténtalo más tarde");
    }
  }
}
