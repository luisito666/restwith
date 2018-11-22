import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../../interfaces/signup.interface';



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

  post_user(user: Signup){
    const response = new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users/new/`;
      const body = JSON.stringify( {
        'username': user.username,
        'password': user.password,
        'email': user.email
      });
      
      this.http.post(url, body, this.get_headers())
              .toPromise()
              .then(res => resolve(res))
              .catch(err => reject(err));

    })

    return response;

  }

  get_headers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return httpOptions;
  }

}
