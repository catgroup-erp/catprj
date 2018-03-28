import { ExcelService } from './services/global/excel.service';
import { GlobalVarService } from './services/global/global-var.service';
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

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
import { ControlPageComponent } from './pages/control-page/control-page.component';
import { DashPipe } from './pipes/dash.pipe';
import { FilterErrorsPipe } from './pipes/filter-errors.pipe';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DecodeTypePipe } from './pipes/decode-type.pipe';
import { ReadableNumberPipe } from './pipes/readable-number.pipe';
import { ErrorsTypeFilterPipe } from './pipes/errors-type-filter.pipe';
import { ControlModalComponent } from './modals/control-modal/control-modal.component';
import { NgbDateCustomParserFormatter } from './common/datepicker-format';
import { InvoiceSummaryComponent } from './pages/invoice-summary/invoice-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardLayoutComponent,
    StartPageComponent,
    PoheaderFormComponent,
    FilterLayoutHeadersPipe,
    FilterLayoutColsPipe,
    IsNumberPipe,
    ControlPageComponent,
    DashPipe,
    FilterErrorsPipe,
    DecodeTypePipe,
    ReadableNumberPipe,
    ErrorsTypeFilterPipe,
    ControlModalComponent,
    InvoiceSummaryComponent
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
    GlobalVarService,
    ExcelService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  entryComponents: [
    ControlModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
