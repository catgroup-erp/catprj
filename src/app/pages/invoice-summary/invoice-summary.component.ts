import { GlobalVarService } from './../../services/global/global-var.service';
import { DataService } from './../../services/data/data.service';
import { Status } from './../../common/data-objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent implements OnInit {

  model: { fromdate: any, todate: any, status: string } = { fromdate: null, todate: null, status: 'A' };
  status: Status = new Status();
  report: any[] = [];

  constructor(private dataService: DataService, private globalVar: GlobalVarService) { }

  ngOnInit() {
  }

  submit() {
    let fromdate = '';

    if (this.model.fromdate)
      fromdate = this.model.fromdate.day + '/' + this.model.fromdate.month + '/' + this.model.fromdate.year;

    let todate = '';
    if (this.model.todate)
      todate = this.model.todate.day + '/' + this.model.todate.month + '/' + this.model.todate.year;

    this.dataService.getInvoiceSummary(this.globalVar.area, this.globalVar.projid,
      this.model.status, fromdate, todate)
      .subscribe(response => {
        this.report = response;
        console.log(this.report);
      })
  }

  formReady(): boolean {
    return (this.globalVar.area != null &&
      this.globalVar.projid != null &&
      this.model.status != null);
  }

}
