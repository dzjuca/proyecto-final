import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Photo } from '@capacitor/camera';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {LoadingController, ToastController} from '@ionic/angular';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token:string;
  private userId:string;
  private username:string;
  private user: User;

  // -----
  photo: SafeResourceUrl;
  private counter = 0;
  public error: string;
  private loading: any;

  constructor( private http: HttpClient,
               private router:Router,
               private readonly sanitizer: DomSanitizer,
               private readonly loadingCtrl: LoadingController,
               private readonly toastCtrl: ToastController) {
   }
   login(username:string, password:string):Promise<void>{
    console.log(`[LoginService] login(${username}, ${password})`)
    return new Promise((resolve, reject) => {
      let url = `${URL}/pulso/auth/login`;
      this.http.post(url,{username:username, password:password})
               .subscribe(async (data:any) => {
                if(!data.error){
                  await this.saveToken(JSON.stringify(data.body.token))
                }else{
                  this.token = null;
                  Storage.clear();
                }
                this.token = data.body.token;
                this.userId = data.body._id;
                this.username = data.body.username;
                let url = `${URL}/pulso/users/${this.userId}`;
                const headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.token}`
                });
                const requestOptions = { headers: headers };
                this.http.get(url,requestOptions)
                          .subscribe((data:any) => {
                            this.user = data.body;
                            resolve();
                          })

               },(e) => reject(e));
    });
   }
   logout():Promise<void>{
    console.log(`[LoginService]: logout()`);
    return new Promise(async (resolve) => {
      this.token = null;
      this.user = null;
      this.userId = null;
      this.username = null;
      //await Storage.remove({key:'token'});
      await Storage.clear();
      resolve();
    });
   }
   addUser(user:User):Promise<User>{
    console.log(`[LoginService]: addUser(${JSON.stringify(user)})`);
    return new Promise((resolve,reject) => {
      let url = `${URL}/pulso/users`;
      this.http.post(url, user)
               .subscribe((user:User) => {
                resolve(user);
               },(e) => {
                console.log('[addUser:LoginServie]: ', e.message);
                reject(e);
               });
    });
   }
   getUser():User{
    return this.user;
   }
   getUsers(query?:string){
    return new Promise (async (resolve, reject) => {
      let url = `${URL}/pulso/users`;
      let token = this.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      let requestOptions = {};

      if(query){

        const params = new HttpParams().set('query', query);
        requestOptions = { headers: headers, params: params};

      }else{

        requestOptions = { headers: headers};

      }


      this.http.get(url,requestOptions)
               .subscribe((response:any) => {

                const pulsoUsers = response.body;
                resolve(pulsoUsers);

               },(e) => {

                console.log('[getUsers:LoginServie]: ', e.message);
                reject(e);

               })
    })



   }
   getUsuario(){

    if( !this.user._id ){

      this.validarToken();

    }

    return { ...this.user }

   }
   getToken(){
    return this.token;
   }
   updateUser(user:User){
    console.log(`[LoginService]: updateUser(${JSON.stringify(user)})`);
    return new Promise(async (resolve, reject) => {

      if(!this.userId){

       const usuario =  await this.getUsuario();
       this.userId = usuario._id;

      }

      let url = `${URL}/pulso/users/${this.userId}`;
      //'Content-Type': 'application/json',
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const requestOptions = { headers: headers };
      this.http.put(url, user, requestOptions)
               .subscribe((response:any) => {
                this.user = user;
                if(!response.error){
                  resolve(true)
                }else{
                  resolve(false);
                }
               },(e) => reject(e));
    })

   }
   async saveToken(token:string){
      await Storage.set({
        key: 'token',
        value: token,
      });
      await this.validarToken();
   }
   async loadToken(){
    const { value } = await Storage.get({ key: 'token' }) || null;
    this.token = JSON.parse(value);
   }
   async validarToken():Promise<boolean>{

    await this.loadToken();

    if(!this.token){
      this.router.navigateByUrl('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const requestOptions = { headers: headers }
      let url = `${URL}/pulso/users/user/bytoken`;
      this.http.get(url, requestOptions)
               .subscribe( (resp:any) => {
                  if(!resp.error){
                    this.user = resp.body;
                    resolve(true);
                  }else{
                    this.router.navigateByUrl('/login');
                    resolve(false);
                  }
               })
    })
   }

   async updateAvatar ( imageData: Photo) {
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });
    await this.loading.present();

    if( !this.token ){
      this.loadToken()
          .then(() => {
            this.token = this.getToken();
          })
    }
    const url = `${URL}/pulso/users/avatar/${this.user._id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(imageData && (imageData.webPath));

    const blob = await fetch(imageData.webPath).then(r => r.blob());

    const formData = new FormData();
    formData.append('image', blob, `file-${this.counter++}.${imageData.format}`);

    const requestOptions = { headers: headers };

    this.http.put<boolean>(url, formData, requestOptions)
             .pipe(
                catchError(e => this.handleError(e)),
                finalize(() => this.loading.dismiss())
              )
             .subscribe((data:any) => {
              this.user.avatar = data.avatar;
              this.showToast(data['ok'])
            });
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
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }
}
