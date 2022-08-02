import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import SwiperCore, { SwiperOptions, Pagination, Scrollbar  } from 'swiper';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  configSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
  };

  constructor() { }

  ngOnInit() {}

}
