import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators'; // Map

@Injectable()
export class MainService {

  constructor(private _http: Http) { }

  get_public(suave) {
    return suave;
  }

}
