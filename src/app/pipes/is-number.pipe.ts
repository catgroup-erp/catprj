import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumber'
})
export class IsNumberPipe implements PipeTransform {

  transform(value: any): boolean {

    if (value) {


      let number = Number(value.replace(/,/g, ''));

      if (number) {
        return true;
      }
    }
    return false;
  }

}
