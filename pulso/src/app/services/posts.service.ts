import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse } from '../models/post-response';
import { LoginService } from './login.service';
import { Post } from '../models/post';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  token:string = null;

  newPost = new EventEmitter<Post>();


  constructor( private http:HttpClient,
               private loginService: LoginService) { }

  getPosts( pull: boolean = false){

    if (pull){

      this.paginaPosts = 0;

    }

    this.paginaPosts ++;
    const url = `${URL}/pulso/posts/?page=${this.paginaPosts}`
    return this.http.get<PostResponse>(url);

  }

  addPost( post ){

    this.token = this.loginService.getToken();
    if( !this.token ){
      this.loginService.loadToken()
          .then(() => {
            this.token = this.loginService.getToken();
          })
    }

    const url = `${URL}/pulso/posts`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const requestOptions = { headers: headers };

    return new Promise( resolve => {

      this.http.post(url, post, requestOptions)
              .subscribe( (resp) => {
                this.newPost.emit( resp['body'] );
                console.log(resp);
                resolve(true);
              });

    });




  }
}
