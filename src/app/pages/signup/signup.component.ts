import { Component, OnInit } from '@angular/core';
/*import { FormGroup, Validators, FormBuilder } from '@angular/forms';*/
import {FormGroup, FormBuilder, Validators} from '@angular/forms' 
import { RegisterService } from 'src/app/shared/services/register.service';
//import [ FormGroup, Validators, Form]

import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailInUse: boolean =false;
  showPassword: boolean = false;

  form: FormGroup;
  toggleEmailInUse(): void {
    this.emailInUse = !this.emailInUse;
  }

  credentials:any = {};
  error: any = null;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password':['', [Validators.required, Validators.minLength(8)]],
      'confirm':['', [Validators.required, Validators.minLength(8)]],
      'terms':[false, Validators.requiredTrue]
    },
      {
        validators: 
          [this.matchPasswords.bind(this)]
        //validaciones asíncronas, ver si el usuario ya existe en la base de datos
      });
   }

  ngOnInit(): void {
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendData(){
    if(this.form.valid){
      this.userService.createAccount({ email: this.form.value.email, password: this.form.value.password }).subscribe({
        next: (value) => {
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  //submit

  register(){
    
  }

  matchPasswords(){
    if (!this.form) return;
    const {password, confirm} = this.form.getRawValue();
    if(password === confirm){
      return null;
    }else{
      return {passwordMismatch:true}
    }
  }
}