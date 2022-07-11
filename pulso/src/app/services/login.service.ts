import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rootUrl = 'http://localhost:3000/pulso';
  // private rootUrl = 'https://pulsobackend.herokuapp.com/pulso'
  private token:string;
  private userId:string;
  private username:string;
  private user: User;

  constructor( private http: HttpClient ) {
    console.log('Hola desde: [LoginService]');
   }

   login(username:string, password:string):Promise<void>{
    console.log(`[LoginService] login(${username}, ${password})`)
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/auth/login`;
      this.http.post(url,{username:username, password:password})
               .subscribe((data:any) => {
                this.token = data.body.token;
                this.userId = data.body._id;
                this.username = data.body.username;
                let url = this.rootUrl + `/users/${this.userId}`;
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
    return new Promise((resolve, reject) => {
      this.token = null;
      this.user = null;
      this.userId = null;
      this.username = null;
      resolve();
    });
   }
   addUser(user:User):Promise<User>{
    console.log(`[LoginService]: addUser(${JSON.stringify(user)})`);
    return new Promise((resolve,reject) => {
      let url = this.rootUrl + `/users`;
      this.http.post(url, user)
               .subscribe((user:User) => {
                resolve(user);
               },(e) => {
                reject(e)
               });
    });
   }
   getUser():User{
    console.log(`[LoginService]: getUser() ${JSON.stringify(this.user)}`);
    return this.user;
   }
   getToken(){
    console.log(`[LoginService]: getToken() ${this.token}`);
    return this.token;
   }
   updateUser(user:User){
    console.log(`[LoginService]: updateUser(${JSON.stringify(user)})`);
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${this.userId}`;
      this.http.put(url, user, {params: {token:this.token}})
               .subscribe((user:User) => {
                this.user = user;
                resolve(user);
               },(e) => reject(e));
    })

   }
}
