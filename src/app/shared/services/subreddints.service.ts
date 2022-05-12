import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ISubreddint {
  name: string;
  description: string;
}

export interface IPost {
  _id: string;
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
  subreddint: string;
  owner: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubreddintsService {

  constructor(private http: HttpClient) { }

  create(subreddint: ISubreddint) {

    const jwt = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })

    return this.http.post('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1/subreddints', subreddint, { headers });
  }

  getPosts(name: string) {
    console.log(name);
    return this.http.get<IPost[]>(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1/subreddints/${name}/posts`);
  }

  joinSub(){
    
  }

}
