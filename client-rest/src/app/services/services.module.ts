import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Servicios de la aplicacion
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

// Servicios que llamam metodos http
import { UserService } from './http/user.service';
import { LoginService } from './http/login.service';

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
        LoginService,
        AuthService,
        AuthGuardService,
        UserService
      ]
    };
  }
}

export {
  LoginService,
  AuthService,
  AuthGuardService,
  UserService
};
