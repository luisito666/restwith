import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptor de peticiones http
import { TokenInterceptor } from './services/token-interceptor';

// modulo de servicios
import { ServicesModule } from './services/services.module';

// Componente principal de la APP
import { AppComponent } from './app.component';

// importando router
import { APP_ROUTING } from './app.routes';

// importando modulo de paginas
import { PagesModule } from './components/pages/pages.module';

// importando modulos compartidos
import { SharedModule } from './components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule,
    ServicesModule.forRoot(),
    APP_ROUTING,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwt');
        },
        whitelistedDomains: ['example.com', 'localhost'],
        blacklistedRoutes: [
          'example.com/examplebadroute/',
          'localhost:4200/login',
          'localhost:4200/home'
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
