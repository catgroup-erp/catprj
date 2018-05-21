import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalVarService {

  area: string;
  projid: number;

  private _area = new Subject<string>();
  private _projid = new Subject<number>();

  currentArea = this._area.asObservable();
  currentProject = this._projid.asObservable();

  constructor() { }


  setArea(area: string) {
    this.area = area;
    this._area.next(area);

  }

  setProject(projid: number) {
    this.projid = projid;
    this._projid.next(projid);

  }

}
