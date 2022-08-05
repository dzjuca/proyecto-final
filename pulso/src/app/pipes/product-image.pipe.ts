import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${ URL }/pulso/products/image/${ userId }/${ img }`;
  }

}
