import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, IonicModule } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

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
  
  MAX_GROUPS = 5
  group: number = undefined

  custom_projects = []
  all_projects: any[] = undefined

  current_dropdown: string = undefined
  dropdown_menu: Array<{ id: number, title: string }> = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private rest: RestProvider) {   
    this.group = this.navParams.get('group');
  }

  ionViewDidLoad() {
    console.log("Grupo: " + this.group)
    this.getProyectos()
  }

  getProyectos() {
    this.rest.getProyectos().then(
      (res) => {
        this.all_projects = JSON.parse(JSON.stringify(res)).proyectos;
        this.splitProyectos()
        this.customDropdown()
      }
    )
  }

  splitProyectos() {
    let index = 0;
    for (let i = 1 + this.group; i < this.all_projects.length; i += this.MAX_GROUPS) {
      this.custom_projects[index] = this.all_projects[i]
      index++;
    }
  }

  customDropdown() {
    for (let i = 0; i < this.custom_projects.length; i++) {
      this.dropdown_menu.push({ id: this.custom_projects[i].id, title: this.custom_projects[i].title })
    }
    console.log("Done")
  }

  projectSelected() {
    console.log(this.current_dropdown)
  }
}