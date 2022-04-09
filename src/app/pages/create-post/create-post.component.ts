import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.form = this.formBuilder.group({
      'title': ['', Validators.required, Validators.minLength(4)],
      'body':['', Validators.required, Validators.minLength(24)],
      'header': ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  sendData(){
    if(this.form.valid){
      console.log("You should add this to Mongo" + this.form.value);
    
    }
  }

} 
