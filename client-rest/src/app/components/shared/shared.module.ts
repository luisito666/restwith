import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServicesModule } from '../../services/services.module';

import { NavComponent } from './nav/nav.component';

import { ProfileComponent } from './profile/profile.component';

import { LoaderComponent } from './loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule.forRoot(),
  ],
  declarations: [
    NavComponent,
    ProfileComponent,
    LoaderComponent
  ],
  exports: [
    NavComponent,
    ProfileComponent,
    LoaderComponent
  ]
})

export class SharedModule {}
