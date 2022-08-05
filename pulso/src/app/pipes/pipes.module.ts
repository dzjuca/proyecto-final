import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ProductImagePipe } from './product-image.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    ProductImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ DomSanitizerPipe, ImageSanitizerPipe, ImagenPipe, ProductImagePipe ]
})
export class PipesModule { }
