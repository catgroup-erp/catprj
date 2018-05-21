import { ColumnSortedEvent } from './../services/global/sort.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTable'
})
export class SortTablePipe implements PipeTransform {

  transform(value: any[], sort: ColumnSortedEvent, serialColumn: string): any[] {

    if (!sort) {
      return value;
    }

    function compareNumbers(a, b) {

      if (a[serialColumn] == b[serialColumn]) {
        if (sort.sortDirection == 'asc') {
          if (Number(a[sort.sortColumn]) < Number(b[sort.sortColumn]))
            return -1;
          if (Number(a[sort.sortColumn]) > Number(b[sort.sortColumn]))
            return 1;

          return 0;
        }
        else if (sort.sortDirection == 'desc') {
          if (Number(a[sort.sortColumn]) > Number(b[sort.sortColumn]))
            return -1;
          if (Number(a[sort.sortColumn]) < Number(b[sort.sortColumn]))
            return 1;

          return 0;
        }
      }


      if (Number(a[serialColumn]) < Number(b[serialColumn]))
        return -1;
      if (Number(a[serialColumn]) > Number(b[serialColumn]))
        return 1;

      return 0;

    }

    function compare(a, b) {

      if (a[serialColumn] == b[serialColumn]) {
        if (sort.sortDirection == 'asc') {
          if (a[sort.sortColumn] < b[sort.sortColumn])
            return -1;
          if (a[sort.sortColumn] > b[sort.sortColumn])
            return 1;

          return 0;
        }
        else if (sort.sortDirection == 'desc') {
          if (a[sort.sortColumn] > b[sort.sortColumn])
            return -1;
          if (a[sort.sortColumn] < b[sort.sortColumn])
            return 1;

          return 0;
        }
      }


      if (Number(a[serialColumn]) < Number(b[serialColumn]))
        return -1;
      if (Number(a[serialColumn]) > Number(b[serialColumn]))
        return 1;

      return 0;

    }


    console.log(isNaN(value[0][sort.sortColumn]), ' ', value[0][sort.sortColumn], ' ', sort.sortColumn);
    if(isNaN(value[0][sort.sortColumn])){
      return value.sort(compare);
    }

    return value.sort(compareNumbers);
  }

}
