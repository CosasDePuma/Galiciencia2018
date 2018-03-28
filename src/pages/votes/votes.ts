import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votes',
  templateUrl: 'votes.html',
})
export class VotesPage {

  jurado: any = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jurado = this.navParams.get('jurado');
  }

  ionViewDidLoad() {
    document.getElementById('p').innerHTML = JSON.stringify(this.jurado);
  }

}