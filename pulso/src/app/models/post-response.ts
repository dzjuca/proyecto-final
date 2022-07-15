import { Post } from './post';

export interface PostResponse {

  error: boolean;
  status: number;
  body:{

    page: number;
    posts: Post [];

  }

}
