import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IPost {
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
}

interface IComment {
  body: string;
  upvotes: number;
  downvotes: number;
  post: string;
  owner: string;
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
    return this.http.get<IPost[]>('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//posts');
  }
  
  getOnePost(id:string){
    return this.http.get(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//posts/${id}`, {});
  }

  getSubreddintPosts(name: string) {
    return this.http.get<IPost[]>('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//api/subreddint/:name');
  }

  upvote(id: string) {
    return this.http.post(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//posts/${id}/upvote`, {});
  }

  downvote(id: string) {
    return this.http.post(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//posts/${id}/downvote`, {});
  }

  create(post: ICreatePost) {

    const jwt = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }) 

    return this.http.post('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//posts', post, {headers});
  }
}
