import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSubs: Subscription;
  constructor(public postsService: PostService) {
    this.isLoading = true;
    this.postsSubs = this.postsService
      .getPostUpdatedListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }
  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
