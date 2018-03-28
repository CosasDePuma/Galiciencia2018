import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {

  restAPI:string;
  year: string = "_2018"; 
  apiKey:string = "6vFmPWoWi4kcWL9CEQujs5dzEbxs9O8M";
  database: string = "galiciencia";
  databaseID: string = "5abb1efa734d1d268cda3599";

  data: any;

  constructor(public http: HttpClient) {
    this.restAPI = "https://api.mlab.com/api/1/databases/"
      .concat(this.database
        .concat("/collections/"
          .concat(this.year
              .concat("/"
                .concat(this.databaseID
                  .concat("?apiKey="
                    .concat(this.apiKey)))))));

  }

  getGalicienciaData() {
    return this.http.get(this.restAPI).toPromise();
  }

}