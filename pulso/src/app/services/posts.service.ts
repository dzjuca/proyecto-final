import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse } from '../models/post-response';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;

  constructor( private http:HttpClient) { }

  getPosts(){
    this.paginaPosts ++;
    const url = `${URL}/pulso/posts/?pagina=${this.paginaPosts}`
    return this.http.get<PostResponse>(url);

  }
}
