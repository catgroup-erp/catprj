import { APIResponse } from './../../common/data-objects';
import { DataService } from './../../services/data/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-modal',
  templateUrl: './control-modal.component.html',
  styleUrls: ['./control-modal.component.scss']
})
export class ControlModalComponent implements OnInit {
  @Input() modalRef;
  @Input() migErr: any;
  @Output() onSave = new EventEmitter<APIResponse>();

  planrt: any[] = [];
  model: { planrt: number } = { planrt: 0 };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlanrt(this.migErr.OM_AREA,
      this.migErr.OM_PROJID, this.migErr.OM_PLAN, this.migErr.OM_POLINEUID, this.migErr.OM_TYPE)
      .subscribe(response => {
        this.planrt = response;
        if(this.planrt.length>0) {
          this.model.planrt = this.planrt[0].PR_ID;
        }

        for(let item of this.planrt) {
          if(item.PR_SELECTED == 'Y') {
            this.model.planrt = Number(item.PR_ID);
            break;
          }
        }
        
      });
  }

  save() {
    let ap: any = {};

    ap['warea'] = this.migErr.OM_AREA;
    ap['wprojid'] = this.migErr.OM_PROJID;
    ap['wpolineuid'] = this.migErr.OM_POLINEUID;
    ap['wactionid'] = this.model.planrt;



    let payload = Object.assign(ap);
    this.dataService.updatePRJPOMIGERR(payload)
      .subscribe(response => {
        this.onSave.emit(response);
      });

    this.modalRef.close('Close click');
  }

}
