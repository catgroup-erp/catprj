import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data/data.service';
import { GlobalVarService } from './../../services/global/global-var.service';
import { Component, OnInit } from '@angular/core';
import { PRJPOLAYOUT, Status, APIResponse } from '../../common/data-objects';
import { ExcelService } from '../../services/global/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlModalComponent } from '../../modals/control-modal/control-modal.component';
import { fade } from './../../common/animations';

@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.scss'],
  animations: [
    fade
  ]
})
export class ControlPageComponent implements OnInit {


  ponumbers: any[] = [];
  reports: any[] = [];
  layouts: PRJPOLAYOUT[] = [];
  prjTotals: any[] = [];

  errorBlockView: any[] = [];
  errors: any[] = [];

  podata: any[] = [];

  columns: number[] = [];
  total: number[] = [];
  totalErr: number[] = [];
  clrTotalErr: number[] = [];

  notPosted: boolean = false;

  response: APIResponse = {} as APIResponse;


  model: { ref: string, report: string, status: string, filter: number } = { ref: null, report: null, status: null, filter: 0 };

  filter: { value: number, label: string }[] = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Errors Pending' },
    { value: 2, label: 'Errors Cleared' },
    { value: 3, label: 'Posted' },
    { value: 4, label: 'All Errors Pending' }
  ];

  area: string;
  projid: number;

  layout: number;
  type: string;
  period: string;

  status: Status = new Status();

  constructor(private excelService: ExcelService,
    private globalVar: GlobalVarService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {

    this.route.params.subscribe(params => {
      this.model.ref = params['ref'];
      this.model.report = params['pouid'];

      this.columns = Array(13).fill(0).map((x, i) => i + 1);
      this.area = this.globalVar.area;
      this.projid = this.globalVar.projid;


      this.init()

      this.globalVar.currentArea.subscribe(area => {
        this.area = area;
      });

      this.globalVar.currentProject.subscribe(projid => {
        this.projid = projid;
        this.updatePONumbers();
      });
    });


  }

  ngOnInit() {

  }

  post() {
    this.dataService.post()
    .subscribe(response => {
      this.response = response;
    })
  }

  init() {
    this.updatePONumbers();

    if (this.model.ref && this.model.report && this.area && this.projid) {
      this.updateReports();
      this.updateErrView();
    }
    else {
      this.model.ref = null;
      this.model.report = null;
      this.dataService.getInit()
        .subscribe(response => {
          let row = response[0];

          if (row) {
            this.area = row.OH_AREA;
            this.projid = row.OH_PROJID;

            if (this.area && this.projid) {
              this.globalVar.setArea(this.area);
              this.globalVar.setProject(this.projid);
            }

            this.model.ref = row.OH_REF;
            this.model.report = row.OH_POUID;
            this.updateReports();
            this.updateErrView();
          }


        });
    }
  }

  openError(row) {
    const modalRef = this.modalService.open(ControlModalComponent, { size: 'lg' });
    modalRef.componentInstance.modalRef = modalRef;
    modalRef.componentInstance.migErr = row;
    modalRef.componentInstance.onSave.subscribe(($e) => {
      if ($e) {
        this.updateErrView();
      }
    });
  }

  downloadErrorBlock(errorBlockTable) {

    console.log(this.errorBlockView);
    this.excelService.exportAsExcelFile(this.errorBlockView, this.model.ref);
  }

  parseTableData(array: any[]): Array<Array<any>> {
    let temp: Array<Array<any>> = [];

    for (let i = 0; i < array.length; i++) {
      var result = [];

      for (var key in array[i]) {
        if (array[i].hasOwnProperty(key)) {
          result.push({
            key: key,
            value: array[i][key]
          });
        }
      }

      temp.push(result);
    }

    console.log(temp);
    return temp;
  }

  updateLayout() {
    this.layouts;
    this.dataService.getLayouts()
      .subscribe(response => {
        this.layouts = response;
      });
  }

  isManager(): boolean {
    return sessionStorage.getItem('roles').includes('CATPRJMAN');
  }

  updateErrView() {
    this.updateLayout();

    this.dataService.checkNotPosted(this.area, this.projid)
    .subscribe(response => {
      if(Number(response[0]['COUNT(*)']) > 0) {
        this.notPosted = true;
      }
    });

    let wwhat = null;

    if (this.model.filter == 4) {
      wwhat = 'A';
    }

    this.dataService.getPOH(this.area, this.projid, this.model.report)
      .subscribe(response => {
        if (response.length > 0) {


          this.layout = response[0].OH_LAYOUT;
          this.type = response[0].OH_TYPE;
          this.model.status = response[0].OH_STATUS;
          this.period = response[0].OH_PERIOD;

        }
      });

    this.dataService.getPOMIGERR_V(this.area, this.projid, this.model.report, wwhat)
      .subscribe(response => {
        this.errorBlockView = response;

        this.totalErr[6] = 0;
        this.totalErr[10] = 0;
        this.totalErr[11] = 0;
        this.totalErr[12] = 0;

        this.clrTotalErr[6] = 0;
        this.clrTotalErr[10] = 0;
        this.clrTotalErr[11] = 0;
        this.clrTotalErr[12] = 0;

        for (let i = 0; i < this.errorBlockView.length; i++) {
          if (this.errorBlockView[i]['OM_ACTIONIDERR']) {

            this.clrTotalErr[6] += Number(this.errorBlockView[i]['OM_COL6']);
            this.clrTotalErr[10] += Number(this.errorBlockView[i]['OM_COL10']);
            this.clrTotalErr[11] += Number(this.errorBlockView[i]['OM_COL11']);
            this.clrTotalErr[12] += Number(this.errorBlockView[i]['OM_COL12']);
          }
          else {
            this.totalErr[6] += Number(this.errorBlockView[i]['OM_COL6']);
            this.totalErr[10] += Number(this.errorBlockView[i]['OM_COL10']);
            this.totalErr[11] += Number(this.errorBlockView[i]['OM_COL11']);
            this.totalErr[12] += Number(this.errorBlockView[i]['OM_COL12']);
          }

        }


        this.fetchErrors(this.period);
      });

    this.dataService.getPOData(this.area, this.projid, this.model.report)
      .subscribe(response => {
        this.podata = response;

        this.total[6] = 0;
        this.total[10] = 0;
        this.total[11] = 0;
        this.total[12] = 0;

        for (let i = 0; i < this.podata.length; i++) {
          this.total[6] += Number(this.podata[i]['PO_COL6']);
          this.total[10] += Number(this.podata[i]['PO_COL10']);
          this.total[11] += Number(this.podata[i]['PO_COL11']);
          this.total[12] += Number(this.podata[i]['PO_COL12']);
        }


      });

    this.dataService.getProjectTotals(this.area, this.projid, this.model.ref)
      .subscribe(response => {
        this.prjTotals = response;
      });
  }

  fetchErrors(period: string) {
    this.dataService.getPOErrors(this.area, this.projid, period)
      .subscribe(response => {
        this.errors = response;
      });
  }


  updateReports() {

    for (let ponumber of this.ponumbers) {
      if (this.model.ref == ponumber.OH_REF) {
        this.globalVar.setProject(ponumber.OH_PROJID);
        break;
      }
    }


    this.reports = [];
    this.dataService.getReports(this.area, this.projid, this.model.ref)
      .subscribe(response => {
        this.reports = response;
        if (this.reports.length == 1) {
          this.model.report = this.reports[0].OH_POUID;
          this.updateErrView();
        }
      });
  }

  updatePONumbers() {
    this.ponumbers = [];
    this.dataService.getPONumbers(this.area, this.projid)
      .subscribe(response => {
        this.ponumbers = response;
      });
  }

  open(content) {
    this.modalService.open(content);
  }

  deletePO() {
    let ap: any = {};

    ap['warea'] = this.area;
    ap['wprojid'] = this.projid;
    ap['wref'] = this.model.ref;


    let payload = Object.assign(ap);
    this.dataService.deletePO(payload)
      .subscribe(response => {
        if (response) {
          this.response = response;
          if (response.status == 0) {
            this.init();
            this.model.ref = null;
            this.model.report = null;
          }
        }

      });
  }

  updateStatus() {
    let ap: any = {};

    ap['warea'] = this.area;
    ap['wprojid'] = this.projid;
    ap['wpouid'] = this.model.report;
    ap['wstatus'] = this.model.status;


    let payload = Object.assign(ap);
    this.dataService.savePRJPOHStatus(payload)
      .subscribe(response => {
        this.response = response;
      });
  }

}
