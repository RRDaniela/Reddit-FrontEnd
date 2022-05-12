import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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

  constructor(private http: HttpClient, private authService: AuthService) {}

  createAccount(account: ICredentials) {
    return this.http.post('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1/users/signup', account);
  }

  login(account: ICredentials_2) {
    return this.http.post<ITokenResponse>('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1/users/signin', account).pipe(map((value) => {
      localStorage.setItem('token', value.token);
      this.authService.decodeToken();
      return value;
    }));
  }

  getUserById(id:string){
    return this.http.get(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1/users/${id}`);
  }

}
