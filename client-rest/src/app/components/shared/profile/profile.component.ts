import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
  .container{
      padding:5%;
  }
  .container .img{
      text-align:center;
  }
  .container .details{
      border-left:3px solid #ded4da;
  }
  .container .details p{
      font-size:15px;
      font-weight:bold;
  }
  `]
})
export class ProfileComponent implements OnInit {

  @Input('user') user;

  constructor() { }

  ngOnInit() {
  }

}
