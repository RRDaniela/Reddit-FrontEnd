import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  form: FormGroup;

  changeText : boolean=false;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.form = this.formBuilder.group({
      'search': ['',Validators.minLength(1)]
    })
   }

  ngOnInit(): void {
  }

  mouseEnter(){
    console.log("mouse enter: ");
    this.changeText=true;
    
  }

  mouseLeave(){
    console.log("mouse leave: ");
    this.changeText=false;
  }

  isLoggedIn(){
    return false;
  }

  search(){
    this.router.navigate([`subreddint/${this.form.value.search}`])
  }

}
