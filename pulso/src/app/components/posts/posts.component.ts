import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: Post [] = [];

  constructor() { }

  ngOnInit() {
    console.log('[posts: PostsComponent]: ', this.posts);
  }

}
