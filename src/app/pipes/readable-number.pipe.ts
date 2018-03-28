import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableNumber'
})
export class ReadableNumberPipe implements PipeTransform {

  transform(value: string, decimals: number = 2): string {
    if(value && value!='-') {
      var parts;
      if(isNaN(Number(value))) {
        parts = value.toString().split(".");
      }
      else {
        parts = Number(value).toFixed(decimals).toString().split(".");
      }
      
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return parts.join(".");
    }
    return null;
  }

}
