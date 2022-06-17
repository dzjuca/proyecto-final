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
