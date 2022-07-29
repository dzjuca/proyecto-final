import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import SwiperCore, { SwiperOptions, Pagination, Scrollbar  } from 'swiper';


SwiperCore.use([ Pagination, Scrollbar ]);

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

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
