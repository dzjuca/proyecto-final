import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  paginaPosts = 0;

  constructor() { }

  getPosts( pull: boolean = false){

    if (pull){

      this.paginaPosts = 0;

    }

    this.paginaPosts ++;
    const url = `${URL}/pulso/posts/?page=${this.paginaPosts}`
    return this.http.get<PostResponse>(url);

  }
}
