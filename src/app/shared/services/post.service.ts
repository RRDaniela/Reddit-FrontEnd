import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IPost {
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
}

interface ICreatePost {
  title: string;
  body: string;
  subreddint: string; // Subreddint ID
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<IPost[]>('http://localhost:3000/posts');
  }

  getSubreddintPosts(name: string) {
    return this.http.get<IPost[]>('http://localhost:3000/api/subreddint/:name');
  }

  upvote(id: string) {
    return this.http.post(`http://localhost:3000/posts/${id}/upvote`, {});
  }

  downvote(id: string) {
    return this.http.post(`http://localhost:3000/posts/${id}/downvote`, {});
  }

  create(post: ICreatePost) {

    const jwt = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }) 

    return this.http.post('http://localhost:3000/posts', post, {headers});
  }
}
