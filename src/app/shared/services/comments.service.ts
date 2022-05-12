import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

interface IComment{
  body: string;
  upvotes: number;
  downvotes: number;
  post: string;
  owner: string;
}
 
interface ICreateComment{
  body: string;
  post_id: string; //post ID
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient, private auth: AuthService,
              private router: Router, private route:ActivatedRoute) { }


  create(comment:ICreateComment){
      const jwt = localStorage.getItem('token');

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      })
      return this.http.post('http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//comments', comment, {headers});
      }

  getAllComments(id: string) {
    return this.http.get<IComment[]>(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//comments/${id}`);
  }


  upvote(id: string) {
    return this.http.put(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//comments/upvote/${id}`, {});
  }

  downvote(id: string) {
    return this.http.put(`http://ec2-18-232-174-60.compute-1.amazonaws.com:3000/api/v1//comments/downvote/${id}`, {});
  }
    
}
