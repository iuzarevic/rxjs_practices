import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, Observable, retry, startWith, switchMap } from 'rxjs';
import { Comment, Post } from '../models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-combine-operators',
  templateUrl: './combine-operators.component.html',
  styleUrls: ['./combine-operators.component.scss']
})
export class CombineOperatorsComponent implements AfterViewInit {
  posts$: Observable<Array<Post>>;
  retrievecreatedByAndComments$: Observable<{createdBy: string, comments: Array<Comment>}>;

  search = new FormControl('', { nonNullable: true });
  results$: Observable<Array<Comment>>;

  constructor(private postService: PostService) {
    this.retrievecreatedByAndComments$ = this.postService.retrievecreatedByAndComments$;
    this.posts$ = this.postService.retrievePosts();

    const validPost$ = this.postService.selectedPostId$.pipe(
      startWith(1)
    )

    const commentsSearch$ = this.search.valueChanges.pipe(
      startWith(this.search.value),
      map(search => search.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== '')
    );

    this.results$ = combineLatest([validPost$, commentsSearch$]).pipe(
      switchMap(([postId, search]) =>
        this.postService.searchCommentsForPost(postId, search).pipe(
          retry(3),
          startWith([])
        )
      )
    );
  }
  ngAfterViewInit(): void {
    this.postService.selectPost({userId: 1, id: 1});
  }

  changedPost(value: Post) {
    this.postService.selectPostId(value.id);
  }
}
