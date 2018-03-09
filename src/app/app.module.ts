import { DataService } from './services/data/data.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGaurdService } from './services/auth/auth-gaurd.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { AppRoutingModule } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { PoheaderFormComponent } from './forms/poheader-form/poheader-form.component';

import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { NgxLogglyModule } from 'ngx-loggly-logger';
import { FilterLayoutHeadersPipe } from './pipes/filter-layout-headers.pipe';
import { FilterLayoutColsPipe } from './pipes/filter-layout-cols.pipe';

import { MatRadioModule } from '@angular/material/radio';
import { IsNumberPipe } from './pipes/is-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardLayoutComponent,
    StartPageComponent,
    PoheaderFormComponent,
    FilterLayoutHeadersPipe,
    FilterLayoutColsPipe,
    IsNumberPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    NgProgressModule,
    NgxLogglyModule.forRoot(),
    MatRadioModule
  ],
  providers: [
    AuthGaurdService,
    AuthService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
