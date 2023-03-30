import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, Subject, switchMap, take, throwError } from 'rxjs';
import { Comment, Post, User } from '../models';

const POSTS_API = "https://jsonplaceholder.typicode.com/posts"
const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments"
const USERS_API = "https://jsonplaceholder.typicode.com/users"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private selectedPostIdSubject$ = new BehaviorSubject<number>(1);
  readonly selectedPostId$ = this.selectedPostIdSubject$.asObservable();
  private selectedPostSubject$ = new Subject<Post>();
  readonly selectedPost$ = this.selectedPostSubject$.asObservable();

  constructor(private http: HttpClient) { }

  retrievecreatedByAndComments$ = this.selectedPost$.pipe(
    switchMap(post =>{
      return forkJoin({
        comments: this.http.get<Array<Comment>>(`${COMMENTS_API}?postId=${post.id}`),
        createdBy: this.http.get<Array<User>>(`${USERS_API}?id=${post.userId}`).pipe(map(users => users ? users[0].name : 'invalid user')),
      })
    }),
    map(item => ({comments: item.comments, createdBy: item.createdBy}))
  )

  retrievePosts() {
    return this.http.get<Array<Post>>(POSTS_API).pipe(
      catchError(this.handleError)
    );
  }

  retrievePostComments(postId: number) {
    return this.http.get<Array<Comment>>(`${COMMENTS_API}?postId=${postId}`);
  }

  searchCommentsForPost(postId: number, search: string) {
    return this.http.get<Array<Comment>>(`${COMMENTS_API}?postId=${postId}&name=${search}`);
  }

  selectPost(post: Post) {
    this.selectedPostSubject$.next(post);
  }

  selectPostId(post: number) {
    this.selectedPostIdSubject$.next(post);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const errorInfo = `An error: ${JSON.stringify(err.status)}`
    return throwError(() => errorInfo);
  }
}
