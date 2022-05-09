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
  postId: string='';
  post: any=[];
  comments: any[] = [];
  postOwner: string=''; 
  postTitle: string='';
  postBody: string ='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.getPost(this.postId);
    });
  }

 
  getPost(id:string){
    this.postService.getOnePost(id).subscribe({
      next: (value) => {
        this.post= value;
        this.postTitle = this.post._doc.title;
        this.postBody = this.post._doc.body
        this.comments = this.post.comments;
        this.postOwner = this.post._doc.owner;
        console.log(this.comments);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
