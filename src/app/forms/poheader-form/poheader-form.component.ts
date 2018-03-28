import { Router } from '@angular/router';
import { GlobalVarService } from './../../services/global/global-var.service';
import { fade } from './../../common/animations';
import { NgForm } from '@angular/forms';
import { Poheader } from './../../common/models/poheader';
import { Component, OnInit } from '@angular/core';
import { Area, Project, WBS, Status, PRJPLANH, PRJPOLAYOUT, APIResponse } from '../../common/data-objects';
import { DataService } from '../../services/data/data.service';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'poheader-form',
  templateUrl: './poheader-form.component.html',
  styleUrls: ['./poheader-form.component.scss'],
  animations: [
    fade
  ]
})
export class PoheaderFormComponent implements OnInit {
  model: Poheader = new Poheader(null, null, null, "O", null, "I", null, null, null, null, null);

  projects: Project[];
  contractdates: any[] =[];

  plans: PRJPLANH[];
  layouts: PRJPOLAYOUT[] = [];
  ponumbers: any[] = [];

  layoutData: any[] = [];

  poSelect: boolean = false;

  areaSub: Subscription;
  projectSub: Subscription;

  response: APIResponse = {} as APIResponse;

  ohTypes: { code: string, desc: string }[] = [
    { code: 'O', desc: 'Oil' },
    { code: 'G', desc: 'Gas' },
    { code: 'A', desc: 'Additional' }
  ];

  status: Status = new Status();

  selectedType: string = this.ohTypes[0].code;

  constructor(private router: Router, private dataService: DataService, private toast: ToastrService, private globalVar: GlobalVarService) {

    this.areaChangeTrigger();
    this.updatePONumbers();

    this.areaSub = this.globalVar.currentArea.subscribe(area => {
      this.model.area = area;
      this.areaChangeTrigger();
    });

    this.projectSub = this.globalVar.currentProject.subscribe(projid => {
      this.model.projid = projid;
      this.updatePONumbers();
    });
  }

  ngOnInit() {

    this.model.area =this.globalVar.area;
    this.model.projid = this.globalVar.projid;

    this.dataService.getContractDates()
    .subscribe(response => {
      this.contractdates = response;
    });

    this.dataService.getInit()
      .subscribe(response => {
        let row = response[0];

        if (row) {
          this.model.area = row.OH_AREA;
          this.model.projid = row.OH_PROJID;

          if (this.model.area && this.model.projid) {
            this.globalVar.setArea(this.model.area);
            this.globalVar.setProject(this.model.projid);
          }

          this.model.plan = row.OH_PLAN;
          this.model.layout = row.OH_LAYOUT;
          this.model.ref = row.OH_REF;
          this.model.period = row.OH_PERIOD;
          this.model.type = row.OH_TYPE;
          this.model.status = row.OH_STATUS;
          this.model.invdate = row.OH_INVDATE;

          let podate = row.OH_PODATE.split('/');
          this.model.podate = { day: Number(podate[0]), month: Number(podate[1]), year: Number(podate[2])};

          console.log(this.model.podate);
        }


      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.projectSub.unsubscribe();
    this.areaSub.unsubscribe();
  }

  areaChangeTrigger() {
    this.updatePlans();
    this.updateLayouts();
  }

  updateLayouts() {
    this.layouts = [];
    this.dataService.getLayouts()
      .subscribe(response => {
        this.layouts = response;
      })
  }


  updatePONumbers() {
    this.ponumbers = [];
    this.dataService.getPONumbers(this.model.area, this.model.projid)
      .subscribe(response => {
        this.ponumbers = response;
      });
  }



  updatePlans() {
    console.log('updating plans');
    this.plans = [];
    this.dataService.getPlans(this.model.area)
      .subscribe(response => {
        this.plans = response;
        if (this.plans.length == 1) {
          this.model.plan = this.plans[0].PH_PLAN;
        }
      });
  }

  submit(poForm: NgForm) {
    let wpomig: any = {};
    let ap: any = {};

    ap['warea'] = this.model.area;
    ap['wprojid'] = this.model.projid;

    for (let i = 1; i <= 13; i++) {
      let migString = 'wpomig' + i;
      wpomig[migString] = [];

      for (let j = 0; j < this.layoutData.length; j++) {
        wpomig[migString].push(this.layoutData[j][i - 1]);
      }
    }


    poForm.value.wpodate = poForm.value.wpodate.day + '/' + poForm.value.wpodate.month + '/' + poForm.value.wpodate.year;


    let payload = Object.assign(ap, poForm.value, wpomig);
    this.dataService.savePRJPOH(payload)
      .subscribe(response => {
        this.response = response;
        if (response.status == 0) {
          this.router.navigate(['/control', { ref: this.model.ref, pouid: response.data.pouid }]);
        }
      });
  }

  formReady(): boolean {
    if (this.model.layout &&
      this.model.area &&
      this.model.projid &&
      this.model.ref &&
      this.layoutData.length > 0) {
      return true;
    }
    return false;
  }

  clip(event) {


    // get the clipboard text

    let clipText = event['clipboardData'].getData('Text');

    // split into rows

    let clipRows = clipText.split(String.fromCharCode(13));

    clipRows.splice(-1, 1);
    // split rows into columns

    for (let i = 0; i < clipRows.length; i++) {
      clipRows[i] = clipRows[i].split(String.fromCharCode(9));
    }


    this.layoutData = clipRows;

  }

}