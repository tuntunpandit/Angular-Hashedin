import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Users {
  id?: number;
  name: string;
  role: string;
  salary: string;
  date: string;
  code: string;
  place: string
}
@Injectable({
  providedIn: 'root'
})
export class MainService {
  bodyData = JSON.stringify({
    "username": "test",
    "password": "123456"
  })
  apiURL = "https://tvsfit.mytvs.in/reporting/vrm/api/test_new/int/gettabledata.php";

  constructor(private _http: HttpClient) { }

  getAllListData() {
    let promise = new Promise((resolve, reject) => {
      this._http.post<Array<Users>>(this.apiURL, this.bodyData)
        .toPromise()
        .then(res => {
          let objs = res["TABLE_DATA"].data.map(function (x, index) {
            return {
              id: index,
              name: x[0],
              role: x[1],
              place: x[2],
              code: x[3],
              date: x[4],
              salary: x[5]
            };
          });
          resolve(objs);
        },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  getAllCourses(): Observable<any> {
    return this._http.get("./assets/data.json");
  } 

}
