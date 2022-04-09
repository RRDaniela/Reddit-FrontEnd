import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-subreddint',
  templateUrl: './subreddint.component.html',
  styleUrls: ['./subreddint.component.scss']
})
export class SubreddintComponent implements OnInit {
  subreddintName: string = '';
  subreddintNamelow: string = '';
  posts: any = [];
  voteCount = 0;
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params['name']);
        this.subreddintName = params['name'];
        this.subreddintNamelow = "r/"+this.subreddintName.toLowerCase();
      }
    )

    this.posts=this.getPosts(this.subreddintNamelow);
  }

  getPosts(name:string){
    this.postService.getSubreddintPosts(name).subscribe({
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
