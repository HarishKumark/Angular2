import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class HierarchicalrequirementService {

  // public static const CREATE_WWE_FEATURE="";

  constructor(private http: HttpClient) { }

  getAllHierarchicalrequirement() {
    // this.http.get('https://rally1.rallydev.com/slm/webservice/v2.0/project/204608674320')
    //   .subscribe(
    //     data => console.log(data),
    //     err => console.log(err)
    //   );
  }


  private extractData(res: Response) {
    console.log('in extractdata', res);
    const body = res;
    return body || [];
  }

  private handleError(error: Response) {
    console.log('inside handleerr/or', error);
    if (error) {
      return throwError(error);
    }
  }


  // updateWWEFeatureData(jsonDate) {
  //   return this.http.post("apiURL", jsonDate, { headers: { 'Content-Type': 'application/json' } })
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }


  postReq(url, data, params?): Observable<any> {
    if (params) {
      data.apiName = data.apiName + '/' + params;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        // 'Authorization': 'Basic ' + btoa('yourClientId' + ':' + 'yourClientSecret')
      })
    };

    // tslint:disable-next-line: max-line-length
    // return this.http.post(url, data);

    return this.http.post<any>(url, data);
  }

  getReq(urlName: string, data?: any): Observable<any> {
    return this.http.get(urlName)
      .pipe(map(this.extractData));
  }

}
