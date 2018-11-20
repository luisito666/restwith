import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Modulo de servicios
import { ServicesModule } from '../../services/services.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ServicesModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})

export class PagesModule {}
