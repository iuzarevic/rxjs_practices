import { Component, OnInit } from '@angular/core';
import { map, ReplaySubject, share, take, tap, timer } from 'rxjs';
import { PostService } from '../services/post.service';

const CACHE_TIMEOUT = 2000;


@Component({
  selector: 'app-sharing-stream',
  templateUrl: './sharing-stream.component.html',
  styleUrls: ['./sharing-stream.component.scss']
})
export class SharingStreamComponent implements OnInit {

  constructor(private postService: PostService){}
  ngOnInit(): void {
    this.posts$.subscribe(console.log);
    this.posts$.subscribe(console.log);
    this.posts$.subscribe(console.log);

    setTimeout(() => {
      this.posts$.subscribe(console.log);
    }, CACHE_TIMEOUT + 1000);
  }

  posts$ = this.postService.retrievePosts()
    .pipe(
      tap(() => console.log('request happened')),
      map((posts) => posts.filter((_, index) => index < 5)),
      map((posts) => posts.map((post) => post.title)),
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(CACHE_TIMEOUT),
      })
    );
}
