import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contractFilter'
})
export class ContractFilterPipe implements PipeTransform {

  transform(value: any[], filter: boolean): any[] {

    if(filter) {
      return value.filter(function (item) {
        return Number(item.PO_CALCAMT).toFixed(2) != Number(item.PO_CONTRACTVAL).toFixed(2);
      });
    }
    
    return value;
  }

}
