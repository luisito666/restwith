import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { Users } from '../interfaces/users.interface';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';



@Injectable()
export class AuthService {

  errorMessages: string;
  showErrors: boolean;

  constructor(
    private _login: LoginService,
    private _rt: Router,
    private decoder: JwtHelperService
    ) {}

  set_session(user: Users) {
    this._login.get_token(user)
          .then(res => {
            if (res['access'] && res['refresh']) {
              localStorage.setItem('jwt', JSON.stringify(res['access']));
              localStorage.setItem('refresh', JSON.stringify(res['refresh']));
              // this._rt.navigate(['/home']);
            }
          }).catch( err => {
            this.errorMessages = err.error['non_field_errors'][0];
            this.getErrors();
          });
  }

  getToken(): Observable<string> {
    const token = localStorage.getItem('jwt');
    const isTokenExpired = this.decoder.isTokenExpired(token);
    if (!isTokenExpired) {
      return of(token);
    }

    return this.refreshToken();
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwt');
    const isTokenExpired = this.decoder.isTokenExpired(token);
    return isTokenExpired;
  }

  getErrors() {
    this.showErrors = true;
    setTimeout( () => {
      this.showErrors = false;
    }, 5000);
  }

  refreshToken(): Observable<string> {

    // append refresh token if you have one
    const refreshToken = localStorage.getItem('refresh');
    const expiredToken = localStorage.getItem('jwt');

    return this._login.get_refresh_(refreshToken)
          .pipe(
            share(),
            map( res => {
              const token = res.headers.get('access');
              localStorage.setItem('jwt', token);
              return token;
            }));


  }

}
