import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterErrors'
})
export class FilterErrorsPipe implements PipeTransform {

  transform(value: any[], polineuid: string): any[] {
    var result = value.filter(function( obj ) {
      return obj.MR_POLINEUID == polineuid;
    });
    return result;
  }

}
