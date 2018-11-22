import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Modulo de servicios
import { ServicesModule } from '../../services/services.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';


import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ServicesModule.forRoot(),
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ]
})

export class PagesModule {}
