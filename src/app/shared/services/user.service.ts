import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

interface ICredentials {
  email: string;
  username:string;
  password: string;
}

interface ICredentials_2 {
  email: string;
 password: string;
}

interface ITokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  createAccount(account: ICredentials) {
    return this.http.post('http://localhost:3000/users/signup', account);
  }

  login(account: ICredentials_2) {
    return this.http.post<ITokenResponse>('http://localhost:3000/users/signin', account).pipe(map((value) => {
      localStorage.setItem('token', value.token);
      return value;
    }));
  }

  getUserById(id:string){
    return this.http.get(`http://localhost:3000/users/${id}`)
  }

}
