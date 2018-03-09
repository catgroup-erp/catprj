import { fade } from './../../common/animations';
import { PRJPLANH, PRJPOLAYOUT, APIResponse, SelectItem } from './../../common/data-objects';
import { NgForm } from '@angular/forms';
import { Poheader } from './../../common/models/poheader';
import { Component, OnInit } from '@angular/core';
import { Area, Project, WBS } from '../../common/data-objects';
import { DataService } from '../../services/data/data.service';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'poheader-form',
  templateUrl: './poheader-form.component.html',
  styleUrls: ['./poheader-form.component.scss'],
  animations: [
    fade
  ]
})
export class PoheaderFormComponent implements OnInit {
  model: Poheader = new Poheader("", null, null, "O", "", null, null, null, "");

  areas: SelectItem[];
  projects: Project[];
  wbss: WBS[];
  plans: PRJPLANH[];
  layouts: PRJPOLAYOUT[] = [];

  layoutData: any[] =[];

  response: APIResponse = {} as APIResponse;

  ohTypes: { code: string, desc: string }[] = [
    { code: 'O', desc: 'Oil' },
    { code: 'G', desc: 'Gas' },
    { code: 'A', desc: 'Additional' }
  ];

  selectedType: string = this.ohTypes[0].code;

  constructor(private dataService: DataService, private toast: ToastrService) { }

  ngOnInit() {
    this.dataService.getAreas()
      .pipe(
      map(areas => {
        return areas.map(area => new SelectItem(area.AR_AREA, area.AR_DESC));
      }))
      .subscribe(response => {
        this.areas = response;
      });
  }

  areaChangeTrigger() {
    this.updateProjects();
    this.updatePlans();
    this.updateLayouts();
  }

  updateLayouts() {
    this.dataService.getLayouts()
      .subscribe(response => {
        this.layouts = response;
        this.model.layout = null;
        console.log(this.layouts);
      })
  }

  updateProjects() {

    this.dataService.getProjects()
      .subscribe(response => {
        this.projects = response;
        this.model.projid = null;
        this.updateWBSList();
      });
  }

  updateWBSList() {
    this.dataService.getWBS(this.model.area, this.model.projid)
      .subscribe(response => {
        this.wbss = response;
        this.model.wbs = null;
      });
  }

  updatePlans() {
    this.dataService.getPlans(this.model.area)
      .subscribe(response => {
        this.plans = response;
        this.model.plan = null;
      });
  }

  submit(poForm: NgForm) {
    let wpomig: any = {};

    for(let i=1;i<=13;i++){
      let migString = 'wpomig' + i;
      wpomig[migString] = [];

      for(let j=0;j<this.layoutData.length;j++){
        wpomig[migString].push(this.layoutData[j][i-1]);
      }
    }


    let payload = Object.assign(poForm.value, wpomig);
    this.dataService.savePRJPOH(payload)
      .subscribe(response => {
        this.response = response;
        if(response.status == 0) {
          poForm.reset();
          this.layoutData = [];
        }
      });
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
    console.log(this.layoutData);

  }

}