import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICreate{
  name: string,
  description: string,
  header: object
}

@Injectable({
  providedIn: 'root'
})
export class SubreddintCreateService {

  constructor(private http:HttpClient){}

  //createSubreddit(body:any): Observable<any>{
    //return Observable.of("Added");
  //}
}
