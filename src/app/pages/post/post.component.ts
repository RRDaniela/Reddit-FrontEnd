import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { IPost, SubreddintsService } from 'src/app/shared/services/subreddints.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  form: FormGroup;
  postId: string='';
  commentId: string='';
  post: any=[];
  comments: any = [];
  postOwner: string=''; 
  postTitle: string='';
  postBody: string ='';
  item:string='';
  userName: any=[];
  commentOwner: string='';
  owner: string='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private commentsService: CommentsService,
    private userService: UserService
  ) { 
    this.form = this.formBuilder.group({
      'body': ['',Validators.minLength(2)]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.getPost(this.postId);
    });
  }


  sendData(){
    if(this.form.valid){
      this.commentsService.create({
        body: this.form.value.body,
        post_id: this.postId
      }).subscribe({
        next: (value) => {
          this.router.navigate([`posts/${this.postId}`]);
          this.getComments(this.postId)
        }
      }
    )}

    this.form.reset();
  }


  getComments(id:string){
    this.commentsService.getAllComments(id).subscribe({
      next: (value) => {
        this.comments = value;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getUser(id:string){
    this.userService.getUserById(id).subscribe(response => {
      this.userName=response;
      return this.userName;
    }, err => {
      console.log(err);
    }
    )
  }

  getPost(id:string){
    this.postService.getOnePost(id).subscribe({
      next: (value) => {
        this.post= value;
        this.postTitle = this.post._doc.title;
        this.postBody = this.post._doc.body
        this.comments = this.post.comments;
        this.comments.forEach((element : any) => 
          console.log(this.getUser(element.owner)));
          //element.owner = this.getUser(element.owner));
        this.getUser(this.post._doc.owner);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  upvote(id: string) {
    this.commentsService.upvote(id).subscribe({
      next: (value) => {
        this.getComments(this.postId)
      },
    });
  }
  downvote(id: string) {
    this.commentsService.downvote(id).subscribe({
      next: (value) => {
        this.getComments(this.postId)
      },
    });
  }
}
