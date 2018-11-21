import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Helper de autenticacion
import { JwtHelperService } from '@auth0/angular-jwt';

// rxjs
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

// servicio
import { LoginService } from '../http/login.service';

// interface
import { Users } from '../../interfaces/users.interface';

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
    return this._login.get_token(user)
          .then(res => {
            if (res['access'] && res['refresh']) {
              localStorage.setItem('jwt', res['access']);
              localStorage.setItem('refresh', res['refresh']);
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

  get_token() {
    return localStorage.getItem('jwt');
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwt');
    const isTokenExpired = this.decoder.isTokenExpired(token);
    return isTokenExpired;
  }

  logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh');
    this._rt.navigate(['/home']);
  }

  getErrors() {
    this.showErrors = true;
    setTimeout( () => {
      this.showErrors = false;
    }, 5000);
  }

  refreshToken(): Observable<string> {

    const refreshToken = localStorage.getItem('refresh');

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
