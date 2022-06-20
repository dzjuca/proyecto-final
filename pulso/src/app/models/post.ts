export interface Post {
   id: number;
   logo: string;
   username:string;
   location: string;
   src: string;
   description:string;
   likes: number;
   image?:boolean;
   wrap?:any;
 }

 // export interface Post {
//   _id: string;
//   userID:string;
//   type:string;
//   src: string;
//   likesNumber: number;
//   commentsNumber:number;
//   description:string;
//   date:Date;
// }
