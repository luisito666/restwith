import { Component, OnInit } from '@angular/core';

// importando el router
import { Router } from '@angular/router';

// importando interface de registro
import { Signup } from '../../../interfaces/signup.interface';

// importando el servicio
import { UserService } from '../../../services/http/user.service';

// Importando modulo de formularios
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  data: any = '';
  showErrors = false;
  errorMessage: any = '';
  form: FormGroup;
  form_data: Signup = {
    username: null,
    password: null,
    email: null
  };

  constructor(
    private router: Router,
    private _http: UserService
    ) {
    this.form = new FormGroup({
      'username': new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ], [this.validate_user.bind(this)]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });

    this.form.reset(this.form_data);
  }

  ngOnInit() {
  }

  enviar(){
    this._http.post_user(this.form.value)
                .then(res => {
                  if (res['username']) {
                    this.router.navigate(['/login']);
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.errorMessage = err.error.username[0];
                  this.Errors();
                });
  }

  Errors() {
    this.showErrors = true;
    setTimeout( () => {
      this.showErrors = false;
    }, 5000);
  }

  validate_user(control: FormControl): Promise <any> | Observable <any>  {
    const usuario = control.value.toLowerCase();
    const promesa = new Promise ( (resolve, reject) => {
      this.service_valid(usuario);
      setTimeout(() => {
        if(usuario === this.data) {
          resolve( {existe: true} );
        } else {
          resolve( null );
        }
      }, 2000);

    });

    return promesa;
  }

  service_valid(usuario: string) {
    this._http.verify_user(usuario)
                .subscribe((res: any) => {
                  if ( res.user ) {
                    this.data = res.user;
                  }
                });
  }

}
