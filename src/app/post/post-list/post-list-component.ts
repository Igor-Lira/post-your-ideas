import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post-module';
import { PostService } from '../post-service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list-component.html',
  styleUrls: ['./post-list-component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSubs: Subscription;
  constructor(public postsService: PostService) {
    this.postsSubs = this.postsService
      .getPostUpdatedListener()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }
  ngOnInit(): void {
    this.postsService.getPosts();
  }
  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }
}
