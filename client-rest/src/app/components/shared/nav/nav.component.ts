import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor( 
    private _router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  redirect_button() {
    this._router.navigate(['/login']);
  }

}
