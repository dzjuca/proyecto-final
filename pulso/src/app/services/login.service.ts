import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rootUrl = 'http://localhost:8080/pulso';
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

   logout(){

   }

   addUser(){

   }

   getuser(){

   }

   getToken(){

   }

   updateUser(){

   }
}
