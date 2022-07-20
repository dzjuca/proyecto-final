import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  tempImages:string [] = [];
  isLoadGeolocation = false;
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

  getGeolocation(){

    if ( !this.post.position ){

      this.post.coords = null;
      return;

    }

    this.isLoadGeolocation = true;
    Geolocation.getCurrentPosition()
               .then((coordinates) => {

                const coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
                this.post.coords = coords;
                this.isLoadGeolocation = false;

               })
               .catch((e) => {

               console.log("🚀 ~ file: post.page.ts ~ line 58 ~ PostPage ~ getGeolocation ~ e", e);

               });

    console.log("🚀 ~ file: post.page.ts ~ line 14 ~ PostPage ~ post", this.post);

  }

}
