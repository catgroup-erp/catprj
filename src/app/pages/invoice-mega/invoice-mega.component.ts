import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { GlobalVarService } from '../../services/global/global-var.service';
import { ExcelService } from '../../services/global/excel.service';
import { Status } from '../../common/data-objects';

@Component({
  selector: 'app-invoice-mega',
  templateUrl: './invoice-mega.component.html',
  styleUrls: ['./invoice-mega.component.scss']
})
export class InvoiceMegaComponent implements OnInit {

  model: { fromdate: any, todate: any, status: string } = { fromdate: null, todate: null, status: 'A' };
  status: Status = new Status();
  report: any[] = [];
  title: string;

  @ViewChild('invoiceMega') invoiceMega: ElementRef;

  constructor(private dataService: DataService, private globalVar: GlobalVarService, private excelService: ExcelService) { }

  ngOnInit() {
  }

  submit() {
    let fromdate = '';

    if (this.model.fromdate)
      fromdate = this.model.fromdate.day + '/' + this.model.fromdate.month + '/' + this.model.fromdate.year;

    let todate = '';
    if (this.model.todate)
      todate = this.model.todate.day + '/' + this.model.todate.month + '/' + this.model.todate.year;

    this.dataService.getInvoiceMega(this.globalVar.area, this.globalVar.projid,
      this.model.status, fromdate, todate)
      .subscribe(response => {
        this.report = response.data;
        this.title = response.title;
        console.log(response);
      });
  }

  formReady(): boolean {
    return (this.globalVar.area != null &&
      this.globalVar.projid != null &&
      this.model.status != null);
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.invoiceMega.nativeElement, 'Invoice Summary');
  }


}
