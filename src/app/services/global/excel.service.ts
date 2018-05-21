import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(table: Element, excelFileName: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.table_to_book(table, { raw: true });

    var temp = workbook.Sheets['Sheet1'];

    var split = temp['!ref'].toString().split(':');

    if (split.length > 1) {
      var result = split[1].match(/[a-zA-Z]+|[0-9]+/g);
      console.log(result);

      var startingCode: number = "A".charCodeAt(0);
      var endCode: number = result[0].charCodeAt(0);

      var startRow: number = 1;
      var endRow: number = Number(result[1]);

      console.log(startingCode, endCode, startRow, endRow);

      for (let col = startingCode; col <= endCode; col++) {
        for (let row = startRow; row <= endRow; row++) {
          var target: string = String.fromCharCode(col) + row;
          var item = temp[target];

          if (item) {
            let number = Number(item.v.replace(/,/g, ''));

            if (number) {
              temp[String.fromCharCode(col) + row].t = 'n';
            }
          }

        }
      }
    }

    workbook.Sheets['Sheet1'] = temp;

    //console.log(workbook.Sheets['Sheet1']);

    XLSX.writeFile(workbook, excelFileName+'.xlsx');
  }

}
