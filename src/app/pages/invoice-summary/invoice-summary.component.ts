import { Router } from '@angular/router';
import { ExcelService } from './../../services/global/excel.service';
import { GlobalVarService } from './../../services/global/global-var.service';
import { DataService } from './../../services/data/data.service';
import { Status } from './../../common/data-objects';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent implements OnInit {

  model: { fromdate: any, todate: any, status: string } = { fromdate: null, todate: null, status: 'A' };
  status: Status = new Status();
  report: any[] = [];
  poitemdiff: any[] = [];
  titleDiff: string;
  title: string;

  diffView: boolean = false;

  filterContract: boolean = false;

  sort: any;

  @ViewChild('invoiceSummary') invoiceSummary: ElementRef;

  constructor(private dataService: DataService, private globalVar: GlobalVarService, private excelService: ExcelService, private router: Router) { }

  ngOnInit() {
  }

  onSorted(event) {
    this.sort = event;
  }

  submit() {
    this.diffView = false;
    let fromdate = '';

    if (this.model.fromdate)
      fromdate = this.model.fromdate.day + '/' + this.model.fromdate.month + '/' + this.model.fromdate.year;

    let todate = '';
    if (this.model.todate)
      todate = this.model.todate.day + '/' + this.model.todate.month + '/' + this.model.todate.year;

    this.dataService.getInvoiceSummary(this.globalVar.area, this.globalVar.projid,
      this.model.status, fromdate, todate)
      .subscribe(response => {
        this.report = response.data;
        this.title = response.title;
      });

    this.dataService.getPOITEMDIFF(this.globalVar.area, this.globalVar.projid, this.model.status, fromdate, todate)
      .subscribe(response => {
        this.poitemdiff = response.data;
        this.titleDiff = response.title;
      });
  }

  formReady(): boolean {
    return (this.globalVar.area != null &&
      this.globalVar.projid != null &&
      this.model.status != null);
  }

  exportToExcel() {
    if (this.diffView) {
      this.excelService.exportAsExcelFile(this.invoiceSummary.nativeElement, 'PO(s) Line Items Rates Difference');
    }
    else {
      this.excelService.exportAsExcelFile(this.invoiceSummary.nativeElement, 'Invoice Summary');
    }

  }

  poControl(ref) {
    this.router.navigate(['/control', { ref: ref, pouid: null }]);
  }

}
