import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {

  year: string; 
  apiKey:string;
  restAPI:string;
  database: string;

  data: any;

  constructor(public http: HttpClient) {

    this.year = "_2018";
    this.database = "galiciencia"
    this.apiKey = "6vFmPWoWi4kcWL9CEQujs5dzEbxs9O8M";

    this.restAPI = "https://api.mlab.com/api/1/databases/"
      .concat(this.database
        .concat("/collections/"
          .concat(this.year
              .concat("?apiKey="
                .concat(this.apiKey)))));

  }

  getLoginJurado() {

    this.http.get(this.restAPI).subscribe(data => {
      this.data = data[0].jurado;
      //this.data = JSON.stringify(data);
    }, err => {
      this.data = err;
    });

    return this.data;
  }

}