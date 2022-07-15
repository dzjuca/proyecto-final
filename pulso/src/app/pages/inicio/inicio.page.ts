import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  posts: Post[] = [];

constructor( private postsService:PostsService) { }

ngOnInit() {

  console.log('[ngOnInit]:InicioPage')

  this.postsService.getPosts()
      .subscribe((data) => {
        console.log('[data:InicioPage]: ', data);
        this.posts.push( ...data.body.posts );
      })

}

}


