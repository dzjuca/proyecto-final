import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse } from '../models/post-response';
import { LoginService } from './login.service';
import { Post } from '../models/post';
import { Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  token:string = null;
  photo: SafeResourceUrl;
  private counter = 0;
  public error: string;
  private loading: any;

  newPost = new EventEmitter<Post>();


  constructor( private http:HttpClient,
               private readonly sanitizer: DomSanitizer,
               private loginService: LoginService,
               private readonly loadingCtrl: LoadingController,
               private readonly toastCtrl: ToastController) {
               console.log("🚀 ~ file: posts.service.ts ~ ~ PostsService")
               }

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

  uploadImage1 ( img: string) {
    /*
    console.log("🚀 ~ file: posts.service.ts ~ line 74 ~ PostsService ~ uploadImage ~ img", img);
    this.token = this.loginService.getToken();
    if( !this.token ){
      this.loginService.loadToken()
          .then(() => {
            this.token = this.loginService.getToken();
          })
    }
    const url = `${URL}/pulso/posts/upload`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const options: FileUploadOptions = {

      fileKey: 'image',
      headers: headers

    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, url, options)
                .then( (data) => {
                console.log("🚀 ~ file: posts.service.ts ~ line 90 ~ PostsService ~ .then ~ data", data);
                })
                .catch((e) => {
                console.log("🚀 ~ file: posts.service.ts ~ line 93 ~ PostsService ~ uploadImage ~ e", e);
                })
  */

  }

  async uploadImage2 ( imageData: Photo){

    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    await this.loading.present();

    this.token = this.loginService.getToken();
    if( !this.token ){
      this.loginService.loadToken()
          .then(() => {
            this.token = this.loginService.getToken();
          })
    }
    const url = `${URL}/pulso/posts/upload`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(imageData && (imageData.webPath));

    const blob = await fetch(imageData.webPath).then(r => r.blob());

    const formData = new FormData();
    formData.append('image', blob, `file-${this.counter++}.${imageData.format}`);

    const requestOptions = { headers: headers };

    this.http.post<boolean>(url, formData, requestOptions)
             .pipe(
                catchError(e => this.handleError(e)),
                finalize(() => this.loading.dismiss())
              )
             .subscribe((data) => this.showToast(data['ok']));
  }

  private async showToast(ok: boolean) {
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: any) {
    console.log("🚀 ~ file: posts.service.ts ~ line 173 ~ PostsService ~ handleError ~ error", error.message);
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }




}
