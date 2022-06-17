import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value? 'Male': 'Female';
  }

}
