import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean = true;
  title = 'client-rest';

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }

}
