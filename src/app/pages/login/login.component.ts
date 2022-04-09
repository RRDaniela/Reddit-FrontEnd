import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private userService: UserService,
    ) {
    this.form = this.formBuilder.group({
      'email': ['',Validators.email],
      'password': ['', Validators.minLength(8)]
    })
   }

  ngOnInit(): void {
  }

  login(){
    if(this.form.valid){
      
      this.userService.login({ email: this.form.value.email, password: this.form.value.password }).subscribe({
        next: (value) => {
          this.router.navigate([`posts`]);  
        },
        error: (error) => {
          this.error = error;
        }
      });

    }
  }

}
