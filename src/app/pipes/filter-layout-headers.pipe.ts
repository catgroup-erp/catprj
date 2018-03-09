import { PRJPOLAYOUT } from './../common/data-objects';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLayoutHeaders'
})
export class FilterLayoutHeadersPipe implements PipeTransform {

  transform(value: PRJPOLAYOUT[]): PRJPOLAYOUT[] {
    var result = value.filter(function( obj ) {
      return obj.PL_COL == 0;
    });
    return result;
  }

}
