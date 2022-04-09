import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SubreddintsService } from 'src/app/shared/services/subreddints.service';


@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.scss']
})
export class CreateSubredditComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private subreddintService: SubreddintsService
    ) {
    this.form = this.formBuilder.group({
      'name': ['',Validators.minLength(2)],
      'description':['',  Validators.minLength(24)]
    })
   }

  ngOnInit(): void {
  }

  sendData(){
    if(this.form.valid){
      this.subreddintService.create(this.form.value).subscribe({
        next: (value) => {
          this.router.navigate([`subreddint/${this.form.value.name}`]);
        }
      });
    }
  }

}
