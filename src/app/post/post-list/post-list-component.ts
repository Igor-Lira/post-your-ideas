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
  isLoading = false;
  private postsSubs: Subscription;
  constructor(public postsService: PostService) {
    this.isLoading = true;
    this.postsSubs = this.postsService
      .getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }
  ngOnInit(): void {
    this.postsService.getPosts();
  }
  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
