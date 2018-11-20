import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServicesModule } from '../../services/services.module';

import { NavComponent } from './nav/nav.component';

import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule.forRoot(),
  ],
  declarations: [
    NavComponent,
    ProfileComponent
  ],
  exports: [
    NavComponent,
    ProfileComponent
  ]
})

export class SharedModule {}
