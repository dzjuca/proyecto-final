import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${ URL }/pulso/users/image/${ userId }/${ img }`;
  }

}
