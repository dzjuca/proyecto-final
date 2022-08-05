import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {

  tempImages:string [] = [];
  product = {
    description: '',
    price: '',
    stock: '',
    category: '',
  }

  constructor( private modalController: ModalController,
               private productsService: ProductsService) { }

  ngOnInit() {
  }

  async addProduct(){


    console.log('[crearPost:PostPage]: ', this.product);
    await this.productsService.addProduct( this.product );
    this.product = {
      description: '',
      price: '',
      stock: '',
      category: ''
    }
    this.tempImages = [];

    //this.router.navigateByUrl('pulso/inicio');
    this.modalController.dismiss();

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
      this.productsService.uploadImage( imageData );
      this.tempImages.push( img );
    })
    .catch((e) => {

      console.log("🚀 ~ file: post.page.ts ~ line 114 ~ PostPage ~ camera ~ e", e);

    })


   }

  productCancel(){
    this.modalController.dismiss();
  }

}
