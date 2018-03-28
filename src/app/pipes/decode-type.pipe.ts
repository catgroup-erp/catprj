import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeType'
})
export class DecodeTypePipe implements PipeTransform {

  transform(value: string): string {
    if(value=="O") {
      return "Oil";
    }
    else if(value=="G") {
      return "Gas";
    }
    else if(value=="A") {
      return "Additional"
    }

    return "Unknown";
  }

}
