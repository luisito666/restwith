import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/http/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  loading:boolean = true;
  user:any = {}

  constructor(private users: UserService) { }

  ngOnInit() {
    this.users.get_user().then(res => {
      this.user = res;
      this.loading = false;
    });
  }

}
