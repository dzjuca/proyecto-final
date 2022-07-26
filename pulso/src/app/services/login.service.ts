import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private rootUrl = 'http://localhost:3000/pulso';
  // private rootUrl = 'https://pulsobackend.herokuapp.com/pulso'
  private token:string;
  private userId:string;
  private username:string;
  private user: User;

  constructor( private http: HttpClient,
               private router:Router) {
    console.log('Hola desde: [LoginService]');
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
    console.log(`[LoginService]: getUser() ${JSON.stringify(this.user)}`);
    return this.user;
   }
   getUsuario(){

    if( !this.user._id ){

      this.validarToken();

    }

    return { ...this.user }

   }
   getToken(){
    console.log(`[LoginService]: getToken() ${this.token}`);
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
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
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
    console.log('[loadToken]: ', this.token);
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
}
