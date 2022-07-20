import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  tempImages:string [] = [];
  post = {
    message: '',
    coords: null,
    position: false
  }

  constructor( private postsService: PostsService,
               private router: Router) { }

  ngOnInit() {
  }

  async crearPost(){

    console.log('[crearPost:PostPage]: ', this.post);
    const response = await this.postsService.addPost( this.post );
    this.post = {
      message: '',
      coords: null,
      position: false
    }

    this.router.navigateByUrl('pulso/inicio');

  }

}
