import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserService {

  apiUrl = 'http://localhost:8000/api/v1/oauth';

  constructor(private http: HttpClient) { }

  get_user() {
    const response = new Promise( (resolve, reject) => {
      const url = `${this.apiUrl}/users/info/`;

      this.http.get(url)
            .toPromise()
            .then(res => resolve(res))
            .catch(err => reject(err));
    });

    return response;
  }

}
