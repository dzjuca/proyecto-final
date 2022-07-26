import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';



declare var window: any;

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
    await this.postsService.addPost( this.post );
    this.post = {
      message: '',
      coords: null,
      position: false
    }
    this.tempImages = [];

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

  camera(){

    const options: ImageOptions = {

      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      correctOrientation: true


    }

    this.imageProcessing(options);

   }

  galeria(){

    const options: ImageOptions = {

      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      correctOrientation: true

    }

    this.imageProcessing(options);

   }

  imageProcessing( options: ImageOptions){

    Camera.getPhoto(options)
    .then(( imageData ) => {
      console.log("🚀 ~ file: post.page.ts ~ line 108 ~ PostPage ~ .then ~ imageData", imageData)
      const img = imageData.webPath;
      this.postsService.uploadImage2( imageData );
      this.tempImages.push( img );
    })
    .catch((e) => {

      console.log("🚀 ~ file: post.page.ts ~ line 114 ~ PostPage ~ camera ~ e", e);

    })


   }

   cancel(){

   }


}
