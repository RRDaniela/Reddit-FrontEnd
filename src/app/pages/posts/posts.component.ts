import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any = [];
  voteCount = 0;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.posts = this.getPosts();
  }

  getPosts(){
    this.postService.getAllPosts().subscribe({
      next: (value) => {
        this.posts=value;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  upvote(){
    this.voteCount += 1;
  }
  downvote(){
    if(this.voteCount <= 1){
      this.voteCount= 0
    }
    else{
      this.voteCount -= 1;
    }
  }

}
