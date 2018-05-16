import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {

  restAPI:string
  year: string = "_2018"
  apiKey:string = "6vFmPWoWi4kcWL9CEQujs5dzEbxs9O8M"
  database: string = "festiciencia"

  constructor(public http: HttpClient) {

  }

  getJuradoLogin() {
    let databaseID = "5afc651d734d1d3038e79477" // login jurado

    this.restAPI = "https://api.mlab.com/api/1/databases/"
      .concat(this.database
        .concat("/collections/"
          .concat(this.year
              .concat("/"
                .concat(databaseID
                  .concat("?apiKey="
                    .concat(this.apiKey)))))))

    return this.http.get(this.restAPI).toPromise()
  }

  getProyectos() {
    let databaseID = "5afc64d0734d1d3038e79451" // proyectos

    this.restAPI = "https://api.mlab.com/api/1/databases/"
      .concat(this.database
        .concat("/collections/"
          .concat(this.year
              .concat("/"
                .concat(databaseID
                  .concat("?apiKey="
                    .concat(this.apiKey)))))))

    return this.http.get(this.restAPI).toPromise()
  }

  updateProyectos(project_id: string, jurado_id: number, valoracion: (number | any[])[]) {
    let databaseID = "5afc64d0734d1d3038e79451" // proyectos

    this.restAPI = "https://api.mlab.com/api/1/databases/"
      .concat(this.database
        .concat("/collections/"
          .concat(this.year
              .concat("/"
                .concat(databaseID
                  .concat("?apiKey="
                    .concat(this.apiKey)))))));

    let options = new HttpHeaders()
    options.append('Content-Type', 'application/json')

    let updateValues = JSON.parse('{ "$set": { "proyectos.' + project_id + '.votes.' + jurado_id + '" : ' + JSON.stringify(valoracion) + ' } }')

    return this.http.put(
      this.restAPI,
      updateValues,
      { headers: options }
    ).toPromise()
  }
}
