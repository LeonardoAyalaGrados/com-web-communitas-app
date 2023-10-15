import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return  `http://localhost:8080/api/media/${value}`;
  }

}
