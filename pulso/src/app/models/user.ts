import { Post } from './post';
export interface User {
  id?:number;
  email:string;
  password:string;
  name:string;
  birthday?:Date;
  phone?:number;
  avatar?:string;
  subscription?:Subscription;
  date?:Date;
  posts?:Post[];
}

enum Subscription{
  diaria  = "diaria",
  semanal = "semanal",
  mensual = "mensual",
  anual = "anual"
}
