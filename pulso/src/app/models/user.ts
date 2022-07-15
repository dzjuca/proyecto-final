import { Post } from './post';
export interface User {
  _id?:number;
  name:string;
  username:string;
  email:string;
  password?:string;
  birthday?:Date;
  phone?:string;
  avatar?:string;
  subscription?:string;
  role?:string;
  createdOn?:Date;
}
