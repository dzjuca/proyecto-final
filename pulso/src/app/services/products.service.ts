import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductResponse } from '../models/product-response';
import { Product } from '../models/product';
import { Photo } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from './login.service';
import {throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  paginaProducts = 0;
  token:string = null;
  photo: SafeResourceUrl;
  private counter = 0;
  public error: string;
  private loading: any;


  newProduct = new EventEmitter<Product>();

  constructor( private http:HttpClient,
               private readonly sanitizer: DomSanitizer,
               private readonly loadingCtrl: LoadingController,
               private readonly toastCtrl: ToastController,
               private loginService: LoginService,) {

               }

  listProducts( pull: boolean = false){

    if (pull){

      this.paginaProducts = 0;

    }

    this.paginaProducts ++;
    const url = `${URL}/pulso/products/?page=${this.paginaProducts}`
    return this.http.get<ProductResponse>(url);

  }

  addProduct( product:Product ){

    this.token = this.loginService.getToken();
    if( !this.token ){
      this.loginService.loadToken()
          .then(() => {
            this.token = this.loginService.getToken();
          })
    }

    const url = `${URL}/pulso/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const requestOptions = { headers: headers };

    return new Promise( resolve => {

      this.http.post(url, product, requestOptions)
              .subscribe( (resp) => {
                this.newProduct.emit( resp['body'] );
                console.log(resp);
                resolve(true);
              });

    });
  }

  async uploadImage ( imageData: Photo){

    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    await this.loading.present();

    this.token = this.loginService.getToken();
    if( !this.token ){
      this.loginService.loadToken()
          .then(() => {
            this.token = this.loginService.getToken();
          })
    }
    const url = `${URL}/pulso/posts/upload`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(imageData && (imageData.webPath));

    const blob = await fetch(imageData.webPath).then(r => r.blob());

    const formData = new FormData();
    formData.append('image', blob, `file-${this.counter++}.${imageData.format}`);

    const requestOptions = { headers: headers };

    this.http.post<boolean>(url, formData, requestOptions)
             .pipe(
                catchError(e => this.handleError(e)),
                finalize(() => this.loading.dismiss())
              )
             .subscribe((data) => this.showToast(data['ok']));
  }

  private async showToast(ok: boolean) {
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: any) {
    console.log("🚀 ~ file: posts.service.ts ~ line 173 ~ PostsService ~ handleError ~ error", error.message);
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }



}
