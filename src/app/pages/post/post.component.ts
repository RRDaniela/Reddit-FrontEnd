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
import { elementAt } from 'rxjs';

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
  owners: any = [];
  postTitle: string='';
  postBody: string ='';
  item:string='';
  userName: any=[];
  commentOwner: any = [];



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
    this.getComments(this.postId);
    this.getUsers();
  }


  sendData(){
    if(this.form.valid){
      this.commentsService.create({
        body: this.form.value.body,
        post_id: this.postId
      }).subscribe({
        next: (value:any) => {
          this.router.navigate([`posts/${this.postId}`]);
          this.getComments(this.postId)
        }
      }
    )}

    this.form.reset();
  }


  getComments(id:string){
    this.commentsService.getAllComments(id).subscribe({
      next: (value:any) => {
        this.comments = value;
        console.log(this.commentOwner);
      },
      error: (err:any) => {
        console.log(err);
      },
    })
  }

  getUser(id:string){
    this.userService.getUserById(id).subscribe({
      next: (value:any) => {
        if(value['username']!=undefined){
          this.postOwner= value['username'];
      }
        else{
        this.postOwner=value['email'];
        }
      },
      error: (err:any) => {
        console.log(err);
      },
    })
  }

  getUsers(){
    this.comments.forEach((element:any) => {
      this.userService.getUserById((element.owner)).subscribe({
        next: (value:any) => {
          if(value['username']!=undefined){
              this.commentOwner.push(value['username']);
          }else{
            this.commentOwner.push(value['email']);
              }
          },
      error:(err:any)=>{
        console.log(err);
      }
      })
  });
  }

  getPost(id:string){
    this.postService.getOnePost(id).subscribe({
      next: (value) => {
        this.post= value;
        this.postTitle = this.post._doc.title;
        this.postBody = this.post._doc.body
        this.comments = this.post.comments;
        this.getUser(this.post._doc.owner);
        this.comments.forEach((element:any) => 
        this.owners.push(element)
        )
        this.getUsers();
    },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  upvote(id: string) {
    this.commentsService.upvote(id).subscribe({
      next: (value:any) => {
        this.getComments(this.postId)
      },
    });
  }
  downvote(id: string) {
    this.commentsService.downvote(id).subscribe({
      next: (value:any) => {
        this.getComments(this.postId)
      },
    });
  }
}
