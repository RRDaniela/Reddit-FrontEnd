import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.form = this.formBuilder.group({
      'email': ['',Validators.email],
      'password': ['', Validators.minLength(8)]
    })
   }

  ngOnInit(): void {
  }

  login(){
    if(this.form.valid){
      console.log("Sesion iniciada para correo: " + this.form.value.email);
      this.router.navigate([`posts`]);
    }else{
      console.log("form invalid")
    }
  }

}
