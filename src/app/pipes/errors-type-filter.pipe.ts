import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorsTypeFilter'
})
export class ErrorsTypeFilterPipe implements PipeTransform {

  transform(value: any[], type: string): any[] {

    var result = value;
    
    if(type=="pending") {
      result= value.filter(function( obj ) {
        return obj.OM_ACTIONIDERR == null;
      });
    }
    else if(type=="cleared") {
      result= value.filter(function( obj ) {
        return obj.OM_ACTIONIDERR != null;
      });
    }
    
    return result;
  }

}
