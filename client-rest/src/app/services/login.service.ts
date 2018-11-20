import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'; // Map

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Users } from '../interfaces/users.interface';
import { headersToString } from 'selenium-webdriver/http';


@Injectable()
export class LoginService {

  apiUrl = 'http://localhost:8000/api/v1/oauth';

  constructor(
    private http: HttpClient
    ) { }

  get_headers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return httpOptions;
  }

  get_token(user: Users) {
    const response = new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/token/`;
      const body = JSON.stringify( {'username': user.username, 'password': user.password} );

      this.http.post(url, body, this.get_headers() )
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });

    });

    return response;
  }

  get_refresh(token: string) {
    const response = new Promise( (reject, resolve) => {
      const url = `${this.apiUrl}/token/refresh/`;
      const body = JSON.stringify({'refresh': localStorage.getItem('jwt')});

      this.http.post(url, body, this.get_headers() )
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });

    });

    return response;
  }

  get_refresh_(token: string) {
    const url = `${this.apiUrl}/token/refresh/`;
    const body = JSON.stringify({'refresh': localStorage.getItem('jwt')});

    return this.http.post(url, body, {
      headers: new HttpHeaders(),
      observe: 'response'
    });


  }

}
