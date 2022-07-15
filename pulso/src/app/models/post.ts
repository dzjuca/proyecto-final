import { User } from './user';
export interface Post {
   _id?: string;
   imgs?: string [];
   message?: string;
   coords?: string;
   usuario?: User;
   createdOn?: string;
 }
