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
  isEnable = true;

constructor( private postsService:PostsService) { }

ngOnInit() {

  console.log('[ngOnInit]:InicioPage')

  this.loadData();

  this.postsService.newPost
      .subscribe( (post) => {

        this.posts.unshift( post );



      });





}

doRefresh(event){
  this.loadData(event, true);
  this.isEnable = true;
  this.posts = [];
}

loadData(event?, pull:boolean = false){

  this.postsService.getPosts( pull )
  .subscribe((data) => {
    console.log('[data:InicioPage]: ', data);
    this.posts.push( ...data.body.posts );

    if (event){
      event.target.complete();

      if(data.body.posts.length === 0){
        this.isEnable = false;
      }
    }
  });

}





}


