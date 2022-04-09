import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: any = [];
  voteCount: number = 0;
  counterUp: number = 0;
  counterDown: number = 0;
  loading: boolean = false;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }
    

  getPosts() {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (value) => {
        console.log(value);
        this.posts = value;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  upvote(id: string) {
    this.postService.upvote(id).subscribe({
      next: (value) => {
        this.getPosts();
      },
    });
  }
  downvote(id: string) {
    this.postService.downvote(id).subscribe({
      next: (value) => {
        this.getPosts();
      },
    });
  }

}
