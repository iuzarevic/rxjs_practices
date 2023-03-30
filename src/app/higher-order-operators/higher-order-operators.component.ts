import { Component, OnInit } from '@angular/core';
import { concatMap, mergeMap, Observable, switchMap } from 'rxjs';
import { Post } from '../models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-higher-order-operators',
  templateUrl: './higher-order-operators.component.html',
  styleUrls: ['./higher-order-operators.component.scss']
})
export class HigherOrderOperatorsComponent implements OnInit {

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    // this.postSelected$.subscribe(postId => {
    //   const comments = this.http.get<Array<Comment>>(`${COMMENTS_API}?postId=${postId}`).subscribe(

    //   );
    // })
  }

  commentsSwitch$ = this.postService.selectedPostId$.pipe(
    switchMap(postId => this.postService.retrievePostComments(postId))
  );

  commentsConcat$ = this.postService.selectedPostId$.pipe(
    concatMap(postId => this.postService.retrievePostComments(postId))
  );

  commentsMerge$ = this.postService.selectedPostId$.pipe(
    mergeMap(postId => this.postService.retrievePostComments(postId))
  );
  posts$: Observable<Array<Post>> = this.postService.retrievePosts();

  changedPost(value: Post) {
    this.postService.selectPostId(value.id);
  }
}
