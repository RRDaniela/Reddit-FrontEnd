import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwtcode from 'jwt-decode';


interface IDecodedToken {
  exp: number;
  iat: number;
  email: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: IDecodedToken | null = null;

  loginStatus:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  constructor() {
    this.loginStatus.next(this.isLoggedIn());
   }

  get(): string{
    return localStorage.getItem('token') || '';
  }

  decodeToken(){
    this.userToken = this.getDecodedAccessToken(this.get()) as IDecodedToken;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtcode(token);
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  remove(): void{
    this.loginStatus.next(false);
    return localStorage.removeItem('token');
  }
}
