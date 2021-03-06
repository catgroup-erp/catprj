import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dash'
})
export class DashPipe implements PipeTransform {

  transform(value: any): any {
    if(value) {
      return value;
    }
    return "-";
  }

}
