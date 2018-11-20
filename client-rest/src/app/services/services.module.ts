import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Servicios de la aplicacion
import { MainService } from './main.service';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';


@NgModule({
  imports: [
    HttpModule
  ],
  exports: [],
  declarations: [],
  providers: []
})

export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        MainService,
        LoginService,
        AuthService,
        AuthGuardService,
        UserService
      ]
    };
  }
}

export {
  MainService,
  LoginService,
  AuthService,
  AuthGuardService,
  UserService
};
