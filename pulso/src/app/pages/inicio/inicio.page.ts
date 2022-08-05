import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../post/post.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  posts: Post[] = [];
  isEnable = true;
  user: User;

constructor( private postsService:PostsService,
             private loginService: LoginService,
             private modalController: ModalController) { }

ngOnInit() {
  // solución temporal
  this.postsService.paginaPosts = 0;
  //
  this.user = this.loginService.getUser();
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


postCreate() {
  console.log('[inicioPage] postCreate()');
  this.modalController.create({ component: PostPage})
          .then((modal) => { modal.present() });
}






}


