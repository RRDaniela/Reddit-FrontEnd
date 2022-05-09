import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { IPost, SubreddintsService } from 'src/app/shared/services/subreddints.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postTitle: string = '';
  postId: string='';
  postBody:any='';
  postTitleLow: string = '';
  //comments: IComment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.postId = params['id'];
     // this.getPost(this.postId);
      console.log(this.postBody);
    });
  }

  /*getPost(id:string){
    this.postService.getOnePost(id).subscribe({
      next: (value) => {
        this.postBody = value;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }*/
}
