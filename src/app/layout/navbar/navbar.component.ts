import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  isLoggedIn: boolean=false;
  changeText : boolean=false;

  constructor(private formBuilder: FormBuilder, private router:Router, private authService:AuthService) {
    this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
    })
    this.form = this.formBuilder.group({
      search: ['', Validators.minLength(1)],
    });
  }

  ngOnInit(): void {}


  search(){
    this.router.navigate([`subreddint/${this.form.value.search}`])
  }

  logout(){
    this.authService.remove();
    this.router.navigate(['/login']);
  }

  isLogged(){
    return this.authService.isLoggedIn();
  }

}
