import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'solesPipe'
})
export class SolesPipePipe implements PipeTransform {

  transform(value: number): string {
    return `S/. ${value.toFixed(2)}`;
  }

}
