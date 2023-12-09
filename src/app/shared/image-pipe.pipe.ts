import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return  `http://communitas-app.us-east-1.elasticbeanstalk.com/api/v1/bucket-s3/show-file/${value}`;
  }

}
