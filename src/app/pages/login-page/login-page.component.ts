import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  submit(loginForm: NgForm) {
    this.authService.login(loginForm.value)
      .subscribe(response => {
        if (response){
          this.router.navigate(['/']);
        }
        else {
          console.log('Failed to login!');
        }
      });
  }


}
