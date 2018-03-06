import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.test()
    .subscribe(response => {
      console.log(response);
    });
  }

}
