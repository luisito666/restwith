import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// interface de usuario
import { Users } from '../../../interfaces/users.interface';

// importando servicio
import { LoginService } from '../../../services/login.service';
import { AuthService } from '../../../services/auth.service';


// Importando modulo de formularios
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public credentials: Users = {
    username: null,
    password: null
  };

  constructor(
    private service: LoginService,
    private auth: AuthService,
    private router: Router ) {
    this.form = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    this.form.reset(this.credentials);


  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  enviar() {
    this.credentials = this.form.value;
    this.auth.set_session(this.credentials);
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

}
