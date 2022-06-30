import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private rootUrl = 'http://localhost:3000/pulso';
  private rootUrl = 'https://pulsobackend.herokuapp.com/pulso'
  private token:string;
  private user: User;

  constructor( private http: HttpClient ) {
    console.log('Hola desde: [LoginService]');
   }

   login(email:string, password:string):Promise<void>{
    console.log(`[LoginService] login(${email}, ${password})`)
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/sessions`;
      this.http.post(url,{email:email, password:password})
               .subscribe((data:{userId:string,token:string}) => {
                this.token = data.token;
                let url = this.rootUrl + `/users/${data.userId}`;
                this.http.get(url,{params:{token:this.token}})
                          .subscribe((user:User) => {
                            this.user = user;
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
      let url = this.rootUrl + `/users/${this.user.id}`;
      this.http.put(url, user, {params: {token:this.token}})
               .subscribe((user:User) => {
                this.user = user;
                resolve(user);
               },(e) => reject(e));
    })

   }
}
