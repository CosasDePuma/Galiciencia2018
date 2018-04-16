import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

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

  MAX_GROUPS = 4
  group: number = undefined
  group_member: number = undefined

  custom_projects = []
  all_projects: any[] = undefined

  current_dropdown: string = undefined
  dropdown_menu: Array<{ id: number, title: string }> = []

  aviso: string = ""
  puntuacion: any[] = [ 1, 1, 1, 1, 1 ]

  constructor(
    private rest: RestProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.group = this.navParams.get('group')
    this.group_member = this.navParams.get('group_member')
  }

  ionViewDidLoad() {
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
  }

  sendPuntuacion() {
    if(this.current_dropdown === undefined) {
      this.noProjectSelected()
    } else {
      this.confirmarVotacion(this.calcularMedia())
    }
  }

  noProjectSelected() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Debe seleccionar un proyecto.',
      buttons: ['Aceptar']
    })
    alert.present()
  }

  calcularMedia() {
    let media = 0
    for (let i = 0; i < this.puntuacion.length; i++) {
      media += this.puntuacion[i]
    }
    return (media / this.puntuacion.length)
  }

  confirmarVotacion(media: number) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar votación',
      message: '¿Seguro que quieres puntuar al proyecto número '
        + this.current_dropdown + ': ' + this.all_projects[this.current_dropdown].title + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            this.enviarInfo(media)
          }
        }
      ]
    });
    alert.present();
  }

  enviarInfo(media: number) {
    this.rest.updateProyectos(this.current_dropdown, this.group_member, media).then(
      (res) => {
          this.navCtrl.setRoot(this.navCtrl.getActive().component, {
            group: this.group,
            group_member: this.group_member
          });

          let toast = this.toastCtrl.create({
            message: 'Votación enviada correctamente',
            duration: 2000,
            position: 'bottom'
          })

          toast.present()

      }
    )
  }
}
