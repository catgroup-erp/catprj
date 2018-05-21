import { Router } from '@angular/router';
import { ExcelService } from './../../services/global/excel.service';
import { GlobalVarService } from './../../services/global/global-var.service';
import { DataService } from './../../services/data/data.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Status } from '../../common/data-objects';

@Component({
  selector: 'app-budget-format',
  templateUrl: './budget-format.component.html',
  styleUrls: ['./budget-format.component.scss']
})
export class BudgetFormatComponent implements OnInit {

  model: { asat: any, status: string, ref: string } = { asat: null, status: 'A', ref: null };
  status: Status = new Status();
  report: any[] = [];
  title: string;

  ponumbers: any[] = [];

  @ViewChild('invoiceSummary') invoiceSummary: ElementRef;

  constructor(private dataService: DataService, private globalVar: GlobalVarService, private excelService: ExcelService, private router: Router) { }

  ngOnInit() {
    this.updatePOList();
    this.globalVar.currentProject.subscribe(projid => {
      console.log(projid);
      this.updatePOList();
    });
  }

  submit() {
    let asat = '';

    if (this.model.asat)
      asat = this.model.asat.day + '/' + this.model.asat.month + '/' + this.model.asat.year;



    this.dataService.getBudgetFormat(this.globalVar.area, this.globalVar.projid,
      this.model.status, asat, this.model.ref)
      .subscribe(response => {
        this.report = response.data;
        this.title = response.title;
      });
  }

  setProject() {
    for (let ponumber of this.ponumbers) {
      if (this.model.ref == ponumber.OH_REF) {
        this.globalVar.setProject(ponumber.OH_PROJID);
        break;
      }
    }
  }

  updatePOList() {
    this.ponumbers = [];
    this.dataService.getPONumbers(this.globalVar.area, this.globalVar.projid)
      .subscribe(response => {
        this.ponumbers = response;
      });
  }


  formReady(): boolean {
    return (this.globalVar.area != null &&
      this.globalVar.projid != null &&
      this.model.status != null);
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.invoiceSummary.nativeElement, 'Budget Format');
  }

  poControl(ref) {
    this.router.navigate(['/control', { ref: ref, pouid: null }]);
  }

}
