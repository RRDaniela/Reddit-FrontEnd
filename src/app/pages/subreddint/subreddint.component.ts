import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { IPost, SubreddintsService } from 'src/app/shared/services/subreddints.service';

@Component({
  selector: 'app-subreddint',
  templateUrl: './subreddint.component.html',
  styleUrls: ['./subreddint.component.scss'],
})
export class SubreddintComponent implements OnInit {
  subreddintName: string = '';
  subreddintNamelow: string = '';
  posts: IPost[] = [];
  voteCount = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private subreddintService: SubreddintsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['name']);
      this.subreddintName = params['name'];
      this.subreddintNamelow = 'r/' + this.subreddintName.toLowerCase();
    });

    this.getPosts(this.subreddintName);
  }

  getPosts(name: string) {
    this.subreddintService.getPosts(name).subscribe({
      next: (value) => {
        this.posts = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  upvote(id: string) {
    this.postService.upvote(id).subscribe({
      next: (value) => {
        this.getPosts(this.subreddintName);
      },
    });
  }
  downvote(id: string) {
    this.postService.downvote(id).subscribe({
      next: (value) => {
        this.getPosts(this.subreddintName);
      },
    });
  }
}
