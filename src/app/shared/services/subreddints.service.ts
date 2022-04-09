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

    return this.http.post('http://localhost:3000/subreddints', subreddint, { headers });
  }

  getPosts(name: string) {
    console.log(name);
    return this.http.get<IPost[]>(`http://localhost:3000/subreddints/${name}/posts`);
  }

}
