import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBy'
})
export class ReplaceByPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const replaceValue = args[0];
    const replacewith = args[1];
    return value.replace(replaceValue, replacewith);
  }

}
