import { Post } from './post';
export interface User {
  _id:string
  username:string;
  email:string;
  password:string;
  phone?:string;
  avatar?:string;
  date?:Date;
  posts?:Post[];
}
