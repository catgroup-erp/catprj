import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  invalidLogin: boolean = false;
  catLogoUrl: string = environment.orclserver + "/images/CATLogo.png";
  message: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  submit(loginForm: NgForm) {
    this.authService.login(loginForm.value)
      .subscribe(response => {
        if (response.status == 0){
          this.router.navigate(['/']);
        }
        else {
          this.invalidLogin = true;
          this.message = response.message;
        }
      });
  }


}
