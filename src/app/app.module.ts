import { SortService } from './services/global/sort.service';
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
import { InvoiceMegaComponent } from './pages/invoice-mega/invoice-mega.component';
import { BudgetFormatComponent } from './pages/budget-format/budget-format.component';
import { ContractFilterPipe } from './pipes/contract-filter.pipe';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { SortTablePipe } from './pipes/sort-table.pipe';

import { MatCheckboxModule } from '@angular/material/checkbox';

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
    InvoiceSummaryComponent,
    InvoiceMegaComponent,
    BudgetFormatComponent,
    ContractFilterPipe,
    SortableColumnComponent,
    SortableTableDirective,
    SortTablePipe
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
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  providers: [
    AuthGaurdService,
    AuthService,
    DataService,
    GlobalVarService,
    ExcelService,
    SortService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  entryComponents: [
    ControlModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
