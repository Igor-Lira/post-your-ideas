import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post-module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
                imagePath: post.imagePath,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPosts.maxPosts,
        });
      });
  }
  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }
  getPost(postId: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>(`http://localhost:3000/api/posts/` + postId);
  }
  addPost(title: string, content: string, image: File) {
    const post = new FormData();
    post.append('title', title);
    post.append('content', content);
    post.append('image', image, title);
    this.http
      .post<{ message: string; post: any }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string) {
    return this.http.delete(`http://localhost:3000/api/posts/` + postId);
  }
  updatePost(id: string, title: string, content: string, image: File | string) {
    let post: Post | FormData;
    if (typeof image === 'object') {
      post = new FormData();
      post.append('id', id);
      post.append('title', title);
      post.append('content', content);
      post.append('image', image, title);
    } else {
      post = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      });
  }
}
