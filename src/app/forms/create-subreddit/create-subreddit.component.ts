import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.scss']
})
export class CreateSubredditComponent implements OnInit {

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.form = this.formBuilder.group({
      'name': ['',Validators.minLength(2)],
      'description':['',  Validators.minLength(24)]
    })
   }

  ngOnInit(): void {
  }

  sendData(){
    if(this.form.valid){
      console.log("You should add this to Mongo" + this.form.value.name + this.form.value.description);
      //You should call the service here 2.
      this.router.navigate([`subreddint/${this.form.value.name}`]);
    }else{
      console.log("form invalid")
    }
  }

}
