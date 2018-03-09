import { PRJPOLAYOUT } from './../common/data-objects';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLayoutCols'
})
export class FilterLayoutColsPipe implements PipeTransform {

  transform(value: PRJPOLAYOUT[], layout: number): PRJPOLAYOUT[] {
    var result = value.filter(function( obj ) {
      return obj.PL_LAYOUT == layout && obj.PL_COL>0;
    });
    return result;
  }

}