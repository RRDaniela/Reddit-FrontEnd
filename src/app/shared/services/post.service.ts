import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IPost{
  title: string, 
  body: string,
  upvotes: number,
  downvotes: number
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPosts(){
    return this.http.get('http://localhost:3000/api/post');
  }

  getSubreddintPosts(name:string){
    return this.http.get('http://localhost:3000/api/subreddint/:name');
  }
}
