import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { DataService } from '../../services/data.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChildren('instaVideo') videos: QueryList<any>;

  nowPlaying = null;
  feeds: Observable<Post[]>;

  posts:Post[] = [];



  constructor(private dataService:DataService,
              private postsService:PostsService) { }

  ngOnInit() {
    console.log('[ngOnInit]');

    /*this.feeds = this.dataService.getPosts();
    console.log(this.feeds)*/
     this.dataService.getPosts()
      .subscribe( (resp:any) => {
        console.log('[ngOnInit:resp]: ',resp);
        this.posts.push(...resp.posts);
      });

  }

  ngAfterViewInit() {
    this.didScroll();
  }

  toggleWrap(feed) {
    feed.wrap = !feed.wrap;
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  didScroll(event?) {
    console.log('[didScroll]:',event);
    if(this.nowPlaying && this.isElementInViewport(this.nowPlaying)) return;
    else if(this.nowPlaying && !this.isElementInViewport(this.nowPlaying)) {
      this.nowPlaying.pause();
      this.nowPlaying = null;
    }

    this.videos.forEach(player => {
      console.log('[player]: ', player);

      if(this.nowPlaying) return;

      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if(inView) {
        this.nowPlaying = nativeElement;
        this.nowPlaying.muted = true;
        this.nowPlaying.play();
      }
    });
  }

}


