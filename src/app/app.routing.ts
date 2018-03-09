import { StartPageComponent } from './pages/start-page/start-page.component';
import { AuthGaurdService } from './services/auth/auth-gaurd.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGaurdService],
    children: [
      { path: '', component: StartPageComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }