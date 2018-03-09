import { AuthService } from './../../services/auth/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  catLogoUrl: string = environment.orclserver + "/images/CATLogo.png";
  name: string = sessionStorage.getItem('name');
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
